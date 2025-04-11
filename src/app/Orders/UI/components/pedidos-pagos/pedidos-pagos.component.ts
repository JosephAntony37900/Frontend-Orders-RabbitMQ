import { Component, OnInit, OnDestroy } from '@angular/core';
import { createOrderUseCase } from '../../../domain/useCase/createOrder_useCase';
import { getAllOrdersUseCase } from '../../../domain/useCase/getAllOrders_useCase';
import { NotificationService } from '../../../../Notifications/infraestructure/services/notification.service';
import { AlertsService } from '../../../../Shared/services/alerts.service';
import { Subscription, timer } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { iOrder } from '../../../domain/models/order';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-pedidos-pagos',
  templateUrl: './pedidos-pagos.component.html',
  styleUrls: ['./pedidos-pagos.component.css']
})
export class PedidosPagosComponent implements OnInit, OnDestroy {
  userId: number = 0;
  createdOrder: iOrder | null = null;
  orders: iOrder[] = [];
  notificationSubscription: Subscription | undefined;
  orderPollingSubscription: Subscription | undefined;
  private lastNotifiedState: string | null = null;

  constructor(
    private createOrder: createOrderUseCase,
    private getAllOrders: getAllOrdersUseCase,
    private notificationService: NotificationService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('user_id') || '0', 10);
    if (!this.userId) {
      console.error('No se encontró el ID del usuario en el storage');
      return;
    }

    this.notificationService.startLongPolling(this.userId);
    this.notificationSubscription = this.notificationService.getNotifications()
      .subscribe(notification => {
        if (notification && notification.Usuario_id === this.userId) {
          const lowerMsg = notification.Mensaje ? notification.Mensaje.toLowerCase() : '';
          this.alertsService.showAlert({
            icon: lowerMsg.includes('aceptado') ? 'success' :
                  (lowerMsg.includes('rechazado') ? 'error' : 'info'),
            title: lowerMsg.includes('aceptado') ? 'Pago aceptado' :
                   (lowerMsg.includes('rechazado') ? 'Pago rechazado' : 'Actualización'),
            text: notification.Mensaje
          });
        }
      });

      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { order: iOrder };
      
      if (state && state.order) {
        this.createdOrder = state.order;
        console.log('Orden recibida desde pedidos-process:', this.createdOrder);
      
        this.alertsService.showAlert({
          icon: 'info',
          title: 'Orden enviada',
          text: 'Tu orden se ha enviado y está pendiente de validación de pago.'
        });
      } else {
        this.getAllOrders.getAllByUser(this.userId).subscribe({
          next: orders => {
            if (orders.length > 0) {
              this.orders = orders;
              this.createdOrder = orders[orders.length - 1];
      
              this.alertsService.showAlert({
                icon: 'info',
                title: 'Último pedido encontrado',
                text: 'Se ha recuperado el último pedido pendiente de validación.'
              });
            } else {
              this.alertsService.showAlert({
                icon: 'error',
                title: 'Sin pedidos',
                text: 'No se encontró ningún pedido para mostrar.'
              });
            }
          },
          error: () => {
            this.alertsService.showAlert({
              icon: 'error',
              title: 'Error',
              text: 'No se pudieron recuperar los pedidos del usuario.'
            });
          }
        });
      }
      

    this.orderPollingSubscription = timer(9000, 9000)
      .pipe(
        switchMap(() => this.getAllOrders.getAllByUser(this.userId)),
        catchError(err => {
          console.error('Error en polling de órdenes:', err);
          return [];  
        })
      )
      .subscribe({
        next: orders => {
          this.orders = orders;
          if (this.createdOrder) {
            const updated = orders.find(o => o.Id === this.createdOrder?.Id);
            if (updated && updated.Estado && updated.Estado !== this.createdOrder?.Estado) {
              const estadoActual = updated.Estado.toLowerCase();

              if (estadoActual !== 'pendiente' && this.lastNotifiedState !== estadoActual) {
                this.createdOrder = updated;
                this.lastNotifiedState = estadoActual;

                let icon: 'success' | 'error' | 'info' = 'info';
                let title = 'Actualización de estado';

                if (estadoActual === 'aceptado' || estadoActual === 'enviado') {
                  icon = 'success';
                  title = estadoActual === 'aceptado' ? 'Pago aceptado' : 'Pedido enviado';
                } else if (estadoActual === 'rechazado') {
                  icon = 'error';
                  title = 'Pago rechazado';
                }

                this.alertsService.showAlert({
                  icon,
                  title,
                  text: `El estado de tu orden ha cambiado a: ${updated.Estado}`
                });
              }
            }       
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe();
    this.orderPollingSubscription?.unsubscribe();
  }
}

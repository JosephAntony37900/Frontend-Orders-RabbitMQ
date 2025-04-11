import { Component, OnInit, OnDestroy } from '@angular/core';
import { createOrderUseCase } from '../../../domain/useCase/createOrder_useCase';
import { NotificationService, LongPollingResponse } from '../../../../Notifications/infraestructure/services/notification.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { iOrder } from '../../../domain/models/order';

@Component({
  selector: 'app-pedidos-pagos',
  templateUrl: './pedidos-pagos.component.html',
  styleUrls: ['./pedidos-pagos.component.css']
})
export class PedidosPagosComponent implements OnInit, OnDestroy {

  // Suponemos que el ID del usuario se obtiene de un servicio de autenticación.
  userId: number = 1;
  notificationSubscription: Subscription | undefined;
  
  constructor(
    private createOrder: createOrderUseCase,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Obtén el user_id almacenado
    this.userId = parseInt(localStorage.getItem('user_id') || '0', 10);
    
    if (!this.userId) {
      console.error('No se encontró el ID del usuario en el storage');
      return;
    }
    
    // Inicia el long polling para este usuario
    this.notificationService.startLongPolling(this.userId);
    
    // Suscríbete para recibir notificaciones, usando este.userId
    this.notificationSubscription = this.notificationService.getNotifications()
        .subscribe(notification => {
          if (notification.Usuario_id === this.userId) {
            Swal.fire({
              icon: notification.Mensaje.toLowerCase().includes('aceptado') ? 'success' : 'error',
              title: notification.Mensaje.toLowerCase().includes('aceptado') ? 'Pago aceptado' : 'Pago rechazado',
              text: notification.Mensaje
            });
          }
        });
    
    // Crear la orden usando el userId obtenido
    const newOrder = {
      Usuario_id: this.userId,
      Producto: 'Detalles de productos comprados',
      Estado: 'Pendiente',
      Pais: 'México',
      Entidad_federativa: 'CDMX',
      Cp: '01000'
    };
    
    this.createOrder.create(newOrder).subscribe({
      next: order => {
        console.log('Orden creada:', order);
        Swal.fire({
          icon: 'info',
          title: 'Orden enviada',
          text: 'Tu orden se ha enviado y está pendiente de validación de pago.',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: error => {
        console.error('Error al crear la orden:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo procesar tu orden.'
        });
      }
    });
  }
  
  
  ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe();
  }
}

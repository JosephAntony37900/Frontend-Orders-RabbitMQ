import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../../Shared/services/cart.service';
import { Router } from '@angular/router';
import { createOrderUseCase } from '../../../domain/useCase/createOrder_useCase';

@Component({
  selector: 'app-pedidos-process',
  templateUrl: './pedidos-process.component.html',
  styleUrls: ['./pedidos-process.component.css']
})
export class PedidosProcessComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  // Formulario
  pais: string = '';
  entidad: string = '';
  cp: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private createOrder: createOrderUseCase
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  terminarOrden(): void {
    console.log('PAÍS:', this.pais);
    console.log('ENTIDAD:', this.entidad);
    console.log('CP:', this.cp);

    const userId = parseInt(localStorage.getItem('user_id') || '0', 10);
    if (!userId || this.cartItems.length === 0) {
      alert('Debes estar logueado y tener productos en el carrito.');
      return;
    }
  
    const newOrder = {
      Usuario_id: userId,
      Producto: this.cartItems.map(item => item.Nombre).join(', '), // por si hay más de uno
      Estado: 'Pendiente',
      Pais: this.pais,
      Entidad_federativa: this.entidad,
      Cp: this.cp
    };
  
    this.createOrder.create(newOrder).subscribe({
      next: (createdOrder) => {
        this.router.navigate(['/checkout'], {
          state: { order: createdOrder }
        });
      },
      error: () => {
        alert('Hubo un error al crear la orden.');
      }
    });
  }
  
}

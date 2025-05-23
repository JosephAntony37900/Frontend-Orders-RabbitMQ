import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../../Shared/services/cart.service';
import { iProducts } from '../../../../Products/domain/models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css']
})

export class PedidosFormComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  removeItem(productId: number | undefined): void {
    if (productId !== undefined) {
      this.cartService.removeFromCart(productId);
      this.loadCart();
    }
  }

  updateQuantity(product: iProducts, event: any): void {
    const quantity = parseInt(event.target.value);
    if (
      quantity > 0 &&
      product.Id !== undefined &&
      quantity <= product.Cantidad 
    ) {
      this.cartService.updateQuantity(product.Id, quantity);
      this.loadCart();
    } else {
      alert('La cantidad excede el stock disponible.');
      this.loadCart(); 
    }
  }  

  proceedToPayment(): void {
    this.router.navigate(['/pedidos-process']);
  }
}
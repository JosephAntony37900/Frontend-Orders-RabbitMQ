import { Component, Input } from '@angular/core';
import { iProducts } from '../../../domain/models/products';
import { CartService } from '../../../../Shared/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards-products',
  templateUrl: './cards-products.component.html',
  styleUrls: ['./cards-products.component.css']
})
export class CardsProductsComponent {
  @Input() products: iProducts[] = [];
  defaultImage = 'product.jpeg'; 

  constructor(private cartService: CartService) {}

  addToCart(product: iProducts) {
    const wasAdded = this.cartService.addToCart(product);

    if (wasAdded) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No hay suficiente stock',
        text: 'No se puede agregar más de este producto al carrito',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    }
  }
}

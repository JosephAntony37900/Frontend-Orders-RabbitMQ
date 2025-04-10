import { Component, Input } from '@angular/core';
import { iProducts } from '../../../domain/models/products';

@Component({
  selector: 'app-cards-products',
  templateUrl: './cards-products.component.html',
  styleUrl: './cards-products.component.css'
})
export class CardsProductsComponent {
  @Input() products: iProducts[] = [];
  defaultImage = 'product.jpeg';
}

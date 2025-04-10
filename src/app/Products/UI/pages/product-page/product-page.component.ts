import { Component, OnInit } from '@angular/core';
import { getAllProductUseCase } from '../../../domain/useCase/getAllProduct_useCase';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products: any[] = [];
  loading = true;

  constructor(private getAllProducts: getAllProductUseCase) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.getAllProducts.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }
}
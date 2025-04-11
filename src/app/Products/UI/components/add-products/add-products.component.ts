import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createProductUseCase } from '../../../domain/useCase/createProduct_useCase';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  productForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private createProduct: createProductUseCase,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      Precio: ['', [Validators.required, Validators.min(0.01)]],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }  

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      const productData = this.productForm.value;

      this.createProduct.create(productData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            text: 'El producto se ha agregado correctamente',
            timer: 2000,
            showConfirmButton: false
          });
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error creating product:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el producto',
          });
          this.loading = false;
        }
      });
    }
  }

  get nombre() { return this.productForm.get('Nombre'); }
  get precio() { return this.productForm.get('Precio'); }
  get cantidad() { return this.productForm.get('Cantidad'); }
}
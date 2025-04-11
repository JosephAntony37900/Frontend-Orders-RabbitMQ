// Shared/services/cart.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { iProducts } from '../../Products/domain/models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'user_cart';
  cartUpdated = new EventEmitter<void>(); 

  constructor() {}

  /**
   * Agrega un producto al carrito.
   * @returns true si se agregó, false si ya se alcanzó el stock.
   */
  addToCart(product: iProducts): boolean {
    const currentCart = this.getCart();
    const existingProduct = currentCart.find(p => p.Id === product.Id);
    
    if (existingProduct) {
      if ((existingProduct.cartQuantity || 0) < product.Cantidad) {
        existingProduct.cartQuantity = (existingProduct.cartQuantity || 1) + 1;
      } else {
        return false;
      }
    } else {
      currentCart.push({ ...product, cartQuantity: 1 });
    }

    localStorage.setItem(this.cartKey, JSON.stringify(currentCart));
    this.cartUpdated.emit();
    return true;
  }

  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartUpdated.emit(); 
  }

  removeFromCart(productId: number): void {
    const currentCart = this.getCart();
    const updatedCart = currentCart.filter(p => p.Id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(updatedCart));
    this.cartUpdated.emit(); 
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.getCart();
    const product = currentCart.find(p => p.Id === productId);
    
    if (product) {
      product.cartQuantity = quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(currentCart));
      this.cartUpdated.emit(); 
    }
  }

  getTotal(): number {
    return this.getCart().reduce((total, product) => {
      return total + (product.Precio * (product.cartQuantity || 1));
    }, 0);
  }
}

export interface CartItem extends iProducts {
    cartQuantity: number;
  }

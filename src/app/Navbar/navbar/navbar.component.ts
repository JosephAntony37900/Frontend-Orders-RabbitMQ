import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Shared/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Users/infraestructure/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;
  isAuthenticated = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateCartCount();
    this.cartService.cartUpdated.subscribe(() => {
      this.updateCartCount();
    });
    
    // Verificar estado de autenticación inicial
    this.authService.isAuthenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
      console.log('Estado autenticación:', authenticated); // Para depuración
    });
  }

  updateCartCount(): void {
    this.cartItemCount = this.cartService.getCart().reduce((count, item) => {
      return count + (item.Cantidad || 1);
    }, 0);
  }

  logout(): void {
    this.authService.logout();
  }
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    // Verificar autenticación al iniciar
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(token: string): void {
    localStorage.setItem('auth_token', token);
    this.isAuthenticatedSubject.next(true);
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }
}
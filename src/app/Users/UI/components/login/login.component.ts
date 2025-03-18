import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserUseCase } from '../../../domain/useCase/loginUser_useCase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginUseCase: LoginUserUseCase,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]], 
      Contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { Email, Contraseña } = this.loginForm.value; 
      this.loginUseCase.login(Email, Contraseña).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error en el login:', err);
          alert('Credenciales incorrectas');
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}
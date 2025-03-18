import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../infraestructure/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.userService.create(user).subscribe({
        next: (response) => {
          alert('Registro exitoso');
          this.router.navigate(['auth/login']); 
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          alert('Error en el registro');
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }
}
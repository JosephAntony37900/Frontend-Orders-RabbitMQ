import { Component, OnInit } from '@angular/core';
import { AuthService } from './Users/infraestructure/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'order-front';
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );
  }
}
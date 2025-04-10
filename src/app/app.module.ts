import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Users/UI/components/login/login.component';
import { RegisterComponent } from './Users/UI/components/register/register.component';
import { AuthComponent } from './Users/UI/pages/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserGateway } from './Users/domain/gateways/UsersGateways';
import { UserService } from './Users/infraestructure/services/users.service';
import { ProductPageComponent } from './Products/UI/pages/product-page/product-page.component';
import { CardsProductsComponent } from './Products/UI/components/cards-products/cards-products.component';
import { ProductService } from './Products/infraestructure/services/products.service';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'dashboard', component: ProductPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    ProductPageComponent,
    CardsProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: UserGateway, useClass: UserService }, { provide: 'ProductGateway', useClass: ProductService }],
  bootstrap: [AppComponent]
})
export class AppModule { }

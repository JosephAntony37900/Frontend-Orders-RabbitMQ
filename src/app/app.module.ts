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
import { PedidosFormComponent } from './Orders/UI/components/pedidos-form/pedidos-form.component';
import { PedidosPagosComponent } from './Orders/UI/components/pedidos-pagos/pedidos-pagos.component';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { OrdersComponent } from './Orders/UI/pages/orders/orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductsComponent } from './Products/UI/components/add-products/add-products.component';
import { ProductGateway } from './Products/domain/gateways/productsGateway';
import { NotificationGateway } from './Notifications/domain/gateways/notificationGateway';
import { NotificationService } from './Notifications/infraestructure/services/notification.service';
import { OrderGateway } from './Orders/domain/gateways/orderGateway';
import { OrderService } from './Orders/infraestructure/services/order.service';
import { NotificationsComponent } from './Notifications/UI/components/notifications/notifications.component';
import { PedidosProcessComponent } from './Orders/UI/components/pedidos-process/pedidos-process.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    ProductPageComponent,
    CardsProductsComponent,
    PedidosFormComponent,
    PedidosPagosComponent,
    NavbarComponent,
    OrdersComponent,
    AddProductsComponent,
    NotificationsComponent,
    PedidosProcessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [{ provide: UserGateway, useClass: UserService }, 
    { provide: 'ProductGateway', useClass: ProductService }, 
    { provide: ProductGateway, useClass: ProductService },
    {provide: NotificationGateway, useClass: NotificationService},
    {provide: OrderGateway, useClass: OrderService}],
  bootstrap: [AppComponent]
})
export class AppModule { }

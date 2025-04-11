import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Users/UI/pages/auth/auth.component';
import { ProductPageComponent } from './Products/UI/pages/product-page/product-page.component';
import { PedidosFormComponent } from './Orders/UI/components/pedidos-form/pedidos-form.component';
import { PedidosPagosComponent } from './Orders/UI/components/pedidos-pagos/pedidos-pagos.component';
import { OrdersComponent } from './Orders/UI/pages/orders/orders.component';
import { LoginComponent } from './Users/UI/components/login/login.component';
import { RegisterComponent } from './Users/UI/components/register/register.component';
import { AddProductsComponent } from './Products/UI/components/add-products/add-products.component';
import { PedidosProcessComponent } from './Orders/UI/components/pedidos-process/pedidos-process.component';

const routes: Routes = [
  { 
    path: 'auth', 
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'dashboard', component: ProductPageComponent },
  { path: 'cart', component: PedidosFormComponent },
  { path: 'checkout', component: PedidosPagosComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products/add', component: AddProductsComponent },
  { path: 'pedidos-process', component: PedidosProcessComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
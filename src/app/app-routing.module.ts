import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ProductComponent} from "./product/product.component";
import {AuthGuardService} from "./auth/auth-guard.servoce";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {RegisterComponent} from "./register/register.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ShoppingCartComponent} from "./shoppingcart/shoppingCart.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: RegisterComponent},
  {path: "products", component: ProductComponent, canActivate:[AuthGuardService]},
  {path: "forbidden", component: ForbiddenComponent},
  {path: "products/:id", component: ProductDetailComponent, canActivate:[AuthGuardService]},
  {path: "cart", component: ShoppingCartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

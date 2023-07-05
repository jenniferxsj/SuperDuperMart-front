import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ProductComponent} from "./product/product.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {RegisterComponent} from "./register/register.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ShoppingCartComponent} from "./shoppingcart/shoppingCart.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrderAdminComponent} from "./order-admin/order-admin.component";
import {WatchlistComponent} from "./watchlist/watchlist.component";
import {AccessGuardService} from "./auth/access-guard.service";
import {UserAccessGuardService} from "./auth/userAccess-guard.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[AuthGuardService]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: RegisterComponent},
  {path: "products", component: ProductComponent, canActivate:[AuthGuardService]},
  {path: "forbidden", component: ForbiddenComponent},
  {path: "products/:id", component: ProductDetailComponent, canActivate:[AuthGuardService]},
  {path: "cart", component: ShoppingCartComponent, canActivate:[AuthGuardService]},
  {path: "orders/all", component: OrderAdminComponent, canActivate:[AuthGuardService, AccessGuardService]},
  {path: "orders/:id", component: OrderDetailComponent, canActivate:[AuthGuardService]},
  {path: "watchlist", component: WatchlistComponent, canActivate:[AuthGuardService, UserAccessGuardService]},
  {path: "404", component: PageNotFoundComponent},
  {path: "**", redirectTo: "/404"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

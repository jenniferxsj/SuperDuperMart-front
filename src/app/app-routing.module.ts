import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ProductComponent} from "./product/product.component";
import {AuthGuardService} from "./auth/auth-guard.servoce";
import {ForbiddenComponent} from "./forbidden/forbidden.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "products", component: ProductComponent, canActivate:[AuthGuardService]},
  {path: "forbidden", component: ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

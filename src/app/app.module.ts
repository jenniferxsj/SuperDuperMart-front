import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AuthGuardService} from "./auth/auth-guard.service";
import {InterceptorService} from "./auth/interceptor.service";
import {UserService} from "./services/user.service";
import { ProductComponent } from './product/product.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shoppingcart/shoppingCart.component';
import {DatePipe} from "@angular/common";
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import {AccessGuardService} from "./auth/access-guard.service";
import {UserAccessGuardService} from "./auth/userAccess-guard.service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    ForbiddenComponent,
    RegisterComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    OrderDetailComponent,
    OrderAdminComponent,
    WatchlistComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    AuthGuardService,
    AccessGuardService,
    UserAccessGuardService,
    UserService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

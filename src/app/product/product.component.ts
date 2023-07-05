import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {UserAuthService} from "../services/auth.service";
import {ProductResponse} from "../model/productResponse.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductData} from "../model/productData.model";
import {UserProduct} from "../model/userProduct.model";
import {OrderItemToAdd} from "../model/orderItemToAdd.model";
import {Location} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  is_admin: boolean = false;
  dataInfo: ProductData[] = [];
  watchlist: number[] = [];
  cart: OrderItemToAdd[] = [];
  constructor(private productService: ProductService, private userAuthService: UserAuthService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllWatchlist();
    this.cart = this.userAuthService.getCart();
  }

  public getAllProducts() {
    this.is_admin = this.userAuthService.isAdmin();
    this.productService.getData().subscribe(
      (res: any) => {
        console.log(res);
        this.dataInfo = res.data;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public addToCart(product: UserProduct) {
    if(product.quantity < 1) {
      alert("Quantity should be at least 1");
      return;
    }
    const idx = this.cart.findIndex(p => p.productId === product.id);
    if(idx > -1) {
      this.cart[idx].quantity = product.quantity;
    } else {
      this.cart.push({productId: product.id, quantity: product.quantity});
    }
    alert("Product added to cart");
    this.userAuthService.setCart(this.cart);
  }

  public placeOrder() {
    this.productService.placeOrder(this.cart).subscribe(
      (response: any) => {
        alert(response.message);
        this.cart = [];
        this.userAuthService.setCart(this.cart);
        for(let product of this.dataInfo) {
          product.quantity = 0;
        }
      },
      error => {
        console.error(error);
        alert("Something's wrong, try again");
      }
    );
    this.changeDetector.detectChanges();
  }

  public addToWatchlist(product: UserProduct) {
    this.productService.addToWatchlist(product.id).subscribe(
      (response:any) => {
        this.watchlist = [];
        this.getAllWatchlist();
        alert(response.message);
      },
      error => {
        console.error(error);
        alert("Something's wrong, try again");
      }
    );
  }
  public getAllWatchlist() {
    this.productService.getAllWatchlist().subscribe(
      (response:any) => {
        response.data.forEach((item:any) => this.watchlist.push(item.id));
      },
      error => {
        console.log(error);
      }
    );
  }

  public removeFromWatchlist(product: UserProduct) {
    this.productService.removeFromWatchlist(product.id).subscribe(
      (response:any) => {
        this.watchlist = [];
        this.getAllWatchlist();
        alert(response.message);
      },
      error => {
        console.error(error);
        alert("Something's wrong, try again");
      }
    )
  }

  createProduct(createProductForm: NgForm) {
    this.productService.createProduct(createProductForm.value).subscribe(
      (response:any) => {
        alert(response.message);
        this.ngOnInit();
      },
      error => console.log(error)
    );
  }
}

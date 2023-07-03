import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {UserAuthService} from "../services/auth.service";
import {ProductResponse} from "../model/productResponse.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductData} from "../model/productData.model";
import {UserProduct} from "../model/userProduct.model";
import {OrderItemToAdd} from "../model/orderItemToAdd.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  is_admin: boolean = false;
  dataInfo: any[] = [];
  quantity: number = 0;
  cart: OrderItemToAdd[] = [];
  constructor(private productService: ProductService, private userAuthService: UserAuthService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.cart = [];
  }

  public getAllProducts() {
    this.is_admin = this.userAuthService.isAdmin();
    this.productService.getData(this.is_admin).subscribe(
      (res) => {
        this.dataInfo = res;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  addToCart(product: UserProduct) {
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
    console.log(this.cart);
  }

  placeOrder() {
    this.productService.placeOrder(this.cart).subscribe(
      response => {
        alert("Order successfully placed");
        this.cart = [];
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

}

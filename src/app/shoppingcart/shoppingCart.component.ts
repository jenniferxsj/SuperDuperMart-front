import {Component, OnInit} from '@angular/core';
import {OrderItemToAdd} from "../model/orderItemToAdd.model";
import {UserAuthService} from "../services/auth.service";
import {ProductService} from "../services/product.service";
import {UserProduct} from "../model/userProduct.model";
import {forkJoin} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  cart: OrderItemToAdd[] = [];
  products: {[productId: number]: UserProduct} = [];
  constructor(private router: Router, private userAuthService: UserAuthService, private productService: ProductService) {
  }

  ngOnInit() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart') {
        this.getProductsData();
      }
    });
    this.getProductsData();
  }

  public getProductsData() {
    this.cart = this.userAuthService.getCart();
    this.products = [];
    for(let cartItem of this.cart) {
      this.productService.getProductById(cartItem.productId).subscribe(
        (response:any) => {
          console.log("response:" + JSON.stringify(response));
          this.products[cartItem.productId] = response;
          //this.products[cartItem.productId].quantity = cartItem.quantity;
        },
        error => {
          console.log(error);
        }
      )
    }
    console.log(Object.keys(this.products).length);
    console.log(this.cart);
  }

  public get productsSize(): number {
    return Object.keys(this.products).length;
  }


  public removeFromCart(i: number) {
    this.userAuthService.setCart([
      ...this.cart.slice(0, i),
      ...this.cart.slice(i + 1)
    ]);
    this.getProductsData();
  }

  public placeOrder() {
    this.productService.placeOrder(this.cart).subscribe(
      (response: any) => {
        alert(response.message);
        this.userAuthService.setCart([]);
        this.router.navigate(["/"])
      },
      error => {
        console.error(error);
        alert("Something's wrong, try again");
      }
    );
  }
}

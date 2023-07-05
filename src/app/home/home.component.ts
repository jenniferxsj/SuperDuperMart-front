import {Component, OnInit} from '@angular/core';
import {OrderData} from "../model/orderData.model";
import {OrderService} from "../services/order.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {ProductOrderItem} from "../model/orderItem.model";
import {UserAuthService} from "../services/auth.service";
import {Order} from "../model/order.model";
import {ProductService} from "../services/product.service";
import {ProductData, ProductProfit} from "../model/productData.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orders: Order[] = [];
  recentProducts: ProductOrderItem[] = [];
  frequentProducts: ProductOrderItem[] = [];
  isAdmin: boolean = false;
  products: ProductData[] = [];
  profitProduct: ProductData[] = [];
  popularProduct: ProductData[] = [];

  constructor(private orderService: OrderService, private datePipe: DatePipe,
              private router: Router, private authUserService: UserAuthService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.allInitialOperation();
  }

  allInitialOperation() {
    this.getUserOrders();
    this.getRecentProducts();
    this.getFrequentProducts();
    this.isAdmin = this.authUserService.isAdmin();
    this.getAllProducts();
    this.getProfitProducts(3);
    this.getPopularProduct(3);
  }

  getUserOrders() {
    this.orderService.getUserOrders().subscribe(
      (response: any) => {
        this.orders = response.orders.map((order:OrderData) => ({
          ...order,
          date_placed: this.datePipe.transform(order.date_placed, 'yyyy-MM-dd HH:mm:ss')
        }));
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe(
      (response:any) => {
        alert(response.message);
        this.allInitialOperation();
      },
      error => console.log(error)
    );
  }

  public getFrequentProducts() {
    this.orderService.frequentProducts(3).subscribe(
      (response: any) => {
        this.frequentProducts = response.data;
      }, error => console.log(error)
    );
  }

  public getRecentProducts() {
    this.orderService.recentProducts(3).subscribe(
      (response: any) => {
        this.recentProducts = response.data;
      }, error => console.log(error)
    );
  }

  public getAllProducts() {
    this.productService.getData().subscribe(
      (response: any) => {
        this.products = response.data;
        console.log(this.products);
        console.log("response:" + response);
      },
      error => console.log(error)
    );
  }

  public completeOrder(id: number) {
    this.orderService.completeOrder(id).subscribe(
      (request:any) => {
        alert(request.message);
        this.allInitialOperation();
      }
    )
  }

  public getProfitProducts(count: number) {
    this.productService.getProfitProduct(count).subscribe(
      (request: any) => {
        console.log("in get profit: " + request);
        this.profitProduct = request.data;
      },
      error => console.log(error)
    );
  }

  public getPopularProduct(count: number) {
    this.productService.getPopularProduct(count).subscribe(
      (request: any) => {
        this.popularProduct = request.data;
      },
      error => console.log(error)
    );
  }
}


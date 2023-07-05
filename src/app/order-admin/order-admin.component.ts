import {Component, OnInit} from '@angular/core';
import {Order} from "../model/order.model";
import {OrderService} from "../services/order.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {OrderData} from "../model/orderData.model";
import {UserAuthService} from "../services/auth.service";

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {
  orders: Order[] = [];
  isAdmin: boolean = false;
  totalPage: number = 0;
  totalElements: number = 0;
  currentPageSize: number = 0;
  constructor(private orderService: OrderService, private datePipe: DatePipe,
              private router: Router, private userAuthService: UserAuthService) {
  }

  ngOnInit() {
    this.getOrders(1, 10);
    this.isAdmin = this.userAuthService.isAdmin();
  }

  getOrders(page: number, size:number) {
    // this.orderService.getAllOrderPageable(page, size).subscribe(
    //   (response: any) => {
    //     this.orders = response.data;
    //     this.totalPage = response.totalPages;
    //     this.totalElements = response.totalElements;
    //     this.currentPageSize = response.size;
    //   },
    //   error => console.log(error)
    // );
    this.orderService.getUserOrders().subscribe(
      (response: any) => {
        this.orders = response.orders.map((order:OrderData) => ({
          ...order,
          date_placed: this.datePipe.transform(order.date_placed, 'yyyy-MM-dd HH:mm:ss')
        }));
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
      },
      error => console.log(error)
    );
  }

  public completeOrder(id: number) {
    this.orderService.completeOrder(id).subscribe(
      (request:any) => {
        alert(request.message);
      }
    )
  }
}

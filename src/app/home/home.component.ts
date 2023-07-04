import {Component, OnInit} from '@angular/core';
import {OrderData} from "../model/orderData.model";
import {OrderService} from "../services/order.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orders: OrderData[] = []
  constructor(private orderService: OrderService, private datePipe: DatePipe,
              private router: Router) {
  }

  ngOnInit() {
    this.getUserOrders();
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
        this.router.navigate(["/home"]);
      },
      error => console.log(error)
    );
  }
}

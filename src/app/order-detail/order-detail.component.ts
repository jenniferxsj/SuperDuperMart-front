import {Component, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../model/order.model";
import {DatePipe} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit{
  order: Order = {id:0, order_status: "", date_placed:"", orderItemDTOList:[]};

  constructor(private orderService: OrderService, private route: ActivatedRoute,
              private datePipe: DatePipe, private router: Router) {
    this.getOneOrder();
  }

  ngOnInit() {
  }

  public getOneOrder() {
    const id:number = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOneOrder(id).subscribe(
      (response:any) => {
        this.order = response.data;
        console.log(response);
      },
      error => console.log(error)
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

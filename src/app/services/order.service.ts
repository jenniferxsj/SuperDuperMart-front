import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {OrderData} from "../model/orderData.model";
import {Order} from "../model/order.model";

@Injectable({providedIn: "root"})
export class OrderService {
  constructor(private httpClient: HttpClient) {
  }

  public getUserOrders() {
    return this.httpClient.get("http://localhost:8080/orders/all");
  }

  public getOneOrder(id:number) {
    return this.httpClient.get(`http://localhost:8080/orders/${id}`);
  }

  public cancelOrder(id: number) {
    return this.httpClient.patch(`http://localhost:8080/orders/${id}/cancel`, []);
  }

  public frequentProducts(count: number) {
    return this.httpClient.get(`http://localhost:8080/products/frequent/${count}`);
  }

  public recentProducts(count: number) {
    return this.httpClient.get(`http://localhost:8080/products/recent/${count}`);
  }

  public completeOrder(id: number) {
    return this.httpClient.patch(`http://localhost:8080/orders/${id}/complete`,[]);
  }

  public getAllOrderPageable(pageNumber: number, pageSize: number) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.get<Order[]>("http://localhost:8080/orders/all", {params});
  }
}

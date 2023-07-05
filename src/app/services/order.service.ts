import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {OrderData} from "../model/orderData.model";

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
}

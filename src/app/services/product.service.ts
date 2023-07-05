import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserProduct} from "../model/userProduct.model";
import {map} from "rxjs";
import {AdminProductData, OrderDetails} from "../model/adminProductData.model";
import {ProductData} from "../model/productData.model";
import {OrderItemToAdd} from "../model/orderItemToAdd.model";

@Injectable({providedIn: "root"})
export class ProductService {
  constructor(private httpClient: HttpClient) {
  }

  public addProduct(product: FormData) {
    return this.httpClient.post<UserProduct>("http://localhost:8080/products", product);
  }

  public getData() {
    return this.httpClient.get("http://localhost:8080/products/all");
  }

  public placeOrder(cart:OrderItemToAdd[]) {
    const orderRequest = {
      order: cart
    }
    console.log(orderRequest)
    return this.httpClient.post("http://localhost:8080/orders", orderRequest);
  }

  public getProductById(id:number) {
    return this.httpClient.get(`http://localhost:8080/products/${id}`).pipe(
      map((response:any):ProductData => {
        return {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          retail_price: response.data.retail_price,
          quantity: response.data.quantity,
          wholesale_price: response.data.wholesale_price
        }
      })
    );
  }

  public addToWatchlist(id:number) {
    return this.httpClient.post(`http://localhost:8080/watchlist/product/${id}`, {});
  }

  public getAllWatchlist() {
    return this.httpClient.get("http://localhost:8080/watchlist/products/all");
  }

  public removeFromWatchlist(id:number) {
    return this.httpClient.delete(`http://localhost:8080/watchlist/product/${id}`);
  }

  public createProduct(newProductData: ProductData) {
    return this.httpClient.post("http://localhost:8080/products", newProductData);
  }

  public updateProduct(newProductData: ProductData, id: number) {
    return this.httpClient.patch(`http://localhost:8080/products/${id}`, newProductData);
  }

  public getProfitProduct(count: number) {
    return this.httpClient.get(`http://localhost:8080/products/profit/${count}`);
  }

  public getPopularProduct(count: number) {
    return this.httpClient.get(`http://localhost:8080/products/popular/${count}`);
  }

  public getSoldCount(id: number) {
    return this.httpClient.get(`http://localhost:8080/products/${id}/sold`);
  }

}

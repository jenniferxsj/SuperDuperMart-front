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

  public getData(isAdmin: boolean) {
    function processAdminData(response: any) {
      if(!response.success || !response.data) {
        console.error(response.message || "Error while processing the data");
      }
      let products:ProductData[] = response.data[0].map(
        (product: ProductData) => {
          return {
            id: product.id,
            description: product.description,
            name: product.name,
            quantity: product.quantity,
            retail_price: product.retail_price,
            wholesale_price: product.wholesale_price
          };
        }
      );

      let orders: OrderDetails[] = response.data[1][0].map(
        (orderDetail: any) => {
          return {
            order: {
              id: orderDetail[0].id,
              date_placed: orderDetail[0].date_placed,
              order_status: orderDetail[0].order_status,
            },
            quantity: orderDetail[1]
          };
        }
      );
      return [products, orders];
    }

    function processUserData(response: any) {
      if(!response.success || !response.data) {
        console.error(response.message || "Error while processing the data");
      }
      const productList: UserProduct[] = response.data;
      return productList;
    }

    return this.httpClient.get("http://localhost:8080/products/all").pipe(
      map(response => {
        if(isAdmin) {
          return processAdminData(response);
        } else {
          return processUserData(response);
        }
      })
    );
  }

  public placeOrder(cart:OrderItemToAdd[]) {
    const orderRequest = {
      order: cart
    }
    console.log(orderRequest)
    return this.httpClient.post("http://localhost:8080/orders", orderRequest);
  }

}

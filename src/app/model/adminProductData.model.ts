import {ProductData} from "./productData.model";
import {OrderData} from "./orderData.model";

export type AdminProductData = [ProductData[], OrderDetails[]];

export interface OrderDetails {
  order: OrderData;
  quantity: number;
}

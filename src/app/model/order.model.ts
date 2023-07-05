import {OrderItem} from "./orderItem.model";

export interface Order {
  id: number;
  date_placed: string;
  order_status: string;
  username: string;
  orderItemDTOList: OrderItem[];
}

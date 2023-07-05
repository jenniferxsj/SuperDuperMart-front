export interface OrderItem {
  id: number;
  purchased_price: number;
  quantity: number;
  productDTO: ProductOrderItem;
}

export interface ProductOrderItem {
  id: number;
  name: string;
  description: string;
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  quantity: number;
  retail_price: number;
  wholesale_price: number
}

export interface ProductProfit {
  product: ProductData;
  profit: number;
}

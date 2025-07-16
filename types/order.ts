import { Address } from "./user";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  address: Address;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  createdAt: Date;
};

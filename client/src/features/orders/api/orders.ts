import { api } from "../../../services/axios";
import type { IOrder } from "@/types/order";

export const getOrders = async (): Promise<IOrder[]> => {
  const res = await api.get<IOrder[]>("/orders");
  return res.data;
};

export const createOrder = async (orderData: {
  shippingAddress: string;
  paymentMethod: string;
}): Promise<any> => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const getOrderById = async (id: string): Promise<IOrder> => {
  const res = await api.get<IOrder>(`/orders/${id}`);
  return res.data;
};


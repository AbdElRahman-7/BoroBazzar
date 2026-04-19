import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Order from '../models/Order.model';
import Cart from '../models/Cart.model';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "العربة فارغة، لا يمكن إتمام الطلب" });
    }

    const newOrder = await Order.create({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      shippingAddress,
      paymentMethod
    });

    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "تم تسجيل الطلب بنجاح", newOrder });
  } catch (error) {
    res.status(500).json({ message: "خطأ أثناء إتمام الطلب", error });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الطلبات", error });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const order = await Order.findOne({ _id: id, userId });
    
    if (!order) {
      return res.status(404).json({ message: "الطلب غير موجود" });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب تفاصيل الطلب", error });
  }
};
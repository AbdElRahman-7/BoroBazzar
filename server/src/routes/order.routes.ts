import { Router } from 'express';
import { createOrder, getUserOrders, getOrderById } from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth protection to all order routes
router.use(authMiddleware);

// POST http://localhost:5000/api/orders
router.post('/', createOrder);

// GET http://localhost:5000/api/orders
router.get('/', getUserOrders);

// GET http://localhost:5000/api/orders/:id
router.get('/:id', getOrderById);

export default router;

import { Router } from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller';

const router = Router();

// POST http://localhost:5000/api/orders
router.post('/', createOrder);

// GET http://localhost:5000/api/orders/:userId
router.get('/:userId', getUserOrders);

export default router;
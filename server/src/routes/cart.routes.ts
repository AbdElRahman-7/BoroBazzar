import { Router } from 'express';
import { addToCart, deleteFromCart, getCart } from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth protection to all cart routes
router.use(authMiddleware);

// POST http://localhost:5000/api/cart  (Body: productId, quantity)
router.post('/', addToCart);

// GET http://localhost:5000/api/cart
router.get('/', getCart);

// DELETE http://localhost:5000/api/cart/:productId
router.delete('/:productId', deleteFromCart);

export default router;
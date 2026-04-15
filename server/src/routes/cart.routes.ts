import { Router } from 'express';
import { addToCart, deleteFromCart, getCart } from '../controllers/cart.controller';

const router = Router();


// POST http://localhost:5000/api/cart/add
router.post('/add', addToCart);

// GET http://localhost:5000/api/cart/:userId
router.get('/:userId', getCart);

// DELETE http://localhost:5000/api/cart/:userId/:productId
router.delete('/:userId/:productId', deleteFromCart);
export default router;
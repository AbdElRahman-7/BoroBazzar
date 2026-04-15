import { Router } from 'express';
import { toggleWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller';

const router = Router();

// POST http://localhost:5000/api/wishlist/toggle
router.post('/toggle', toggleWishlist);

// GET http://localhost:5000/api/wishlist/:userId
router.get('/:userId', getWishlist);

// DELETE http://localhost:5000/api/wishlist/:userId/:productId
router.delete('/:userId/:productId', removeFromWishlist);

export default router;
import { Router } from 'express';
import { toggleWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth protection to all wishlist routes
router.use(authMiddleware);

// POST http://localhost:5000/api/wishlist  (Toggle)
router.post('/', toggleWishlist);

// GET http://localhost:5000/api/wishlist
router.get('/', getWishlist);

// DELETE http://localhost:5000/api/wishlist/:productId
router.delete('/:productId', removeFromWishlist);

export default router;
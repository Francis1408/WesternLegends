import { Router }  from 'express';
import { protect } from '../middleware/auth.js';
import { buyItem } from '../controllers/inventoryController.js';

const router = Router();

router.post('/buy', protect, buyItem);

export default router;
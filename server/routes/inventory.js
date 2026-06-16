import { Router }  from 'express';
import { protect } from '../middleware/auth.js';
import { buyItem, equipItem, dropItem  } from '../controllers/inventoryController.js';

const router = Router();

router.post('/buy', protect, buyItem);
router.post('/equip', protect, equipItem);
router.post('/drop', protect, dropItem)

export default router;
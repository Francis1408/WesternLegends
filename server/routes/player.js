import express from 'express';
import { createPlayer, getMe } from '../controllers/playerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/',     protect, createPlayer);
router.get('/me',   protect, getMe);

export default router;
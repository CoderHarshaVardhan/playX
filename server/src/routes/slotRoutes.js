import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createSlot,
  getSlots,
  getMySlots,
  getSlotById,
  joinSlot,
  leaveSlot,
  cancelSlot
} from '../controllers/slotController.js';

const router = express.Router();

router.route('/')
  .post(protect, createSlot)
  .get(protect, getSlots);

router.route('/my-slots')
  .get(protect, getMySlots);

router.route('/:id')
  .get(protect, getSlotById);

router.route('/:id/join').post(protect, joinSlot);
router.route('/:id/leave').post(protect, leaveSlot);
router.route('/:id/cancel').post(protect, cancelSlot);

export default router;
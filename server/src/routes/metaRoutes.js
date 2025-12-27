// /server/src/routes/metaRoutes.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getSportsList, getVenuesList } from '../controllers/metaController.js';

const router = express.Router();

// Metadata is generally needed for authenticated users to create a slot
router.get('/sports', protect, getSportsList);
router.get('/venues', protect, getVenuesList); // Use user's location for filtering

export default router;
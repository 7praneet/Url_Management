import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createShortUrl, getUserUrls, redirectToLong, deleteUrl, getUrlAnalytics } from '../controllers/urlController.js';


const router = express.Router();
router.post('/', authMiddleware, createShortUrl);
router.get('/me', authMiddleware, getUserUrls);
router.get('/analytics/:id', authMiddleware, getUrlAnalytics);
router.delete('/:id', authMiddleware, deleteUrl);


export default router;
// public redirect route will be mounted separately

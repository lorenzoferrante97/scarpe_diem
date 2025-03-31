import express from 'express';
const router = express.Router();

// import post controller
import productController from '../controllers/productController.js';

// route -> index
router.get('/', productController.index);

// route -> show
router.get('/:slug', productController.show);

// Nuova rotta per filtrare per categoria
router.get('/category/:category', productController.category);

export default router;

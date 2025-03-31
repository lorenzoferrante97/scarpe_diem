import express from 'express';
const router = express.Router();

// import post controller
import productController from '../controllers/productController.js';

// route -> index
router.get('/', productController.index);

// Nuova rotta per filtrare per bestsellers
router.get('/bestsellers', productController.bestsellers);

// Nuova rotta per filtrare per newarrivals
router.get('/newarrivals', productController.newarrivals);

// route -> show
router.get('/:slug', productController.show);

// Nuova rotta per filtrare per categoria
router.get('/category/:category', productController.category);


export default router;

import express from 'express';
const router = express.Router();

// import post controller
import productController from '../controllers/productController.js';

// route -> index
router.get('/', productController.index);

//rotta per ordini
router.get('/orders', productController.indexOrders);

// Nuova rotta per filtrare per bestsellers
router.get('/bestsellers', productController.bestsellers);

// Nuova rotta per filtrare per newarrivals
router.get('/newarrivals', productController.newarrivals);

//Rotta Search
router.get('/search', productController.search);

//Rotta correlati
router.get('/related', productController.related);

// route -> show
router.get('/:slug', productController.show);

// Nuova rotta per filtrare per categoria
router.get('/category/:category', productController.category);

//Rotta per creazione nuovo ordine
router.post('/orders', productController.store)

//Rotta per store della Pivot
router.post('/product_order', productController.storePivot)

//update prezzo totale
router.put('/update-orders', productController.update)

export default router;

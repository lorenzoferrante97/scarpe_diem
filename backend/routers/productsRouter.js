import express from 'express';
const router = express.Router();

// import post controller
import productController from '../controllers/productController.js';

// route -> index
router.get('/', productController.index);

// route -> show
router.get('/:id', productController.show);

// route -> store
router.post('/', productController.store);

export default router;

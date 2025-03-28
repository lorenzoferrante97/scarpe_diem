
import express from 'express';
const router = express.Router();

// import post controller
import postController from '../controllers/postController.js';

// route -> index
router.get('/', postController.index);

// route -> show
router.get('/:id', postController.show);

// route -> store
router.post('/', postController.store);

// route -> update
router.put('/:id', postController.update);

// route -> modify
router.patch('/:id', postController.modify);

// route -> destroy
router.delete('/:id', postController.destroy);

export default router;
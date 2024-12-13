import express from 'express';
import categoryController from '../controller/categoryController';
import validateRequest from '../middleware/validateRequest';
import { createCategorySchema, updateCategorySchema } from '../validationSchemas/categorySchemas';

const router = express.Router();

router.post('/', validateRequest(createCategorySchema), categoryController.createCategory);

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.put('/:id', validateRequest(updateCategorySchema), categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

export default router;
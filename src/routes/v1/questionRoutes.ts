import express from "express";
import {Right} from "../../config/roles";
import userController from "../../controller/userController";
import requireAuth from "../../middleware/authMiddleware";
import validator from "../../middleware/validator";

const router = express.Router();
//
// router.post('/', validateRequest(createCategorySchema), categoryController.createCategory);
//
// router.get('/', categoryController.getAllCategories);
//
// router.get('/:id', categoryController.getCategoryById);
//
// router.put('/:id', validateRequest(updateCategorySchema), categoryController.updateCategory);
//
// router.delete('/:id', categoryController.deleteCategory);

export default router;
import { Request, Response } from 'express';
import Category from '../models/Category';

const categoryController = {
    async createCategory(req: Request, res: Response) {
        try {
            const { categoryName, description } = req.body;
            const result = await categoryService.createCategory(categoryName, description);
            res.status(201).json({ message: 'Category created successfully', result });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await categoryService.getAllCategories();
            res.json({ message: 'Categories fetched successfully', result: categories });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id);
            res.json({ message: 'Category fetched successfully', result: category });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    },

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { categoryName, description } = req.body;
            const result = await categoryService.updateCategory(id, categoryName, description);
            res.json({ message: 'Category updated successfully', result });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    },

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await categoryService.deleteCategory(id);
            res.json({ message: 'Category deleted successfully', result });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    },
};

export default categoryController;
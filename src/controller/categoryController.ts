import { Request, Response } from 'express';
import {Category, CategoryModel} from "../models/Question";

const categoryController = {
    // Create a new category
    async createCategory(req: Request, res: Response) {
        try {
            // const { category_name, description } = req.body;
            //
            // CategoryModel.validate({ category_name, description });
            // await category.save();
            //
            // res.status(201).json({ message: 'Category created successfully', category });
        } catch (error) {
            res.status(500).json({ message: 'Error creating category', error });
        }
    },

    // Get all categories
    async getAllCategories(req: Request, res: Response) {
        try {
            // const categories = await Category.find();
            // res.json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error });
        }
    },

    // Get a category by ID
    async getCategoryById(req: Request, res: Response) {
        try {
            // const category = await Category.findById(req.params.id);
            // if (!category) {
            //     return res.status(404).json({ message: 'Category not found' });
            // }
            //
            // res.json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching category', error });
        }
    }
};

export default categoryController;
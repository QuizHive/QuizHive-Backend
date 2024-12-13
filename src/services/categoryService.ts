import Category from '../models/Category';
import ID from '../models/ID';

const categoryService = {
    async createCategory(categoryName: string, description: string) {
        const category = new Category({
            category_name: categoryName,
            description,
        });
        return category.save();
    },

    async getAllCategories() {
        return Category.find();
    },

    async getCategoryById(categoryId: string) {
        const category = await Category.findById(ID.from(categoryId).toObjectId());
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    },

    async updateCategory(categoryId: string, categoryName: string, description: string) {
        const category = await Category.findByIdAndUpdate(
            ID.from(categoryId).toObjectId(),
            { category_name: categoryName, description },
            { new: true }
        );

        if (!category) {
            throw new Error('Category not found');
        }

        return category;
    },

    async deleteCategory(categoryId: string) {
        const category = await Category.findByIdAndDelete(ID.from(categoryId).toObjectId());
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    },
};

export default categoryService;

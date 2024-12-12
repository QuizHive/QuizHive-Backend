import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    category_name: string;
    description: string;
}

const CategorySchema: Schema = new Schema({
    category_name: { type: String, required: true },
    description: { type: String, required: true },
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

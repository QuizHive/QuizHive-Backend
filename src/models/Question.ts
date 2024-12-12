import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from './Category';

export interface IQuestion extends Document {
    question_text: string;
    options: string[];
    correct: number;  // Index of the correct option
    category: mongoose.Types.ObjectId;  // Reference to the Category model
    solves: number;  // Number of times this question has been solved

    // Instance Method
    increaseSolves(): Promise<void>;
}

const QuestionSchema: Schema = new Schema({
    question_text: { type: String, required: true },
    options: { type: [String], required: true },
    correct: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    solves: { type: Number, default: 0 },
});

// Instance method to increase the number of solves
QuestionSchema.methods.increaseSolves = async function (this: IQuestion) {
    this.solves++;
    await this.save();
};

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;

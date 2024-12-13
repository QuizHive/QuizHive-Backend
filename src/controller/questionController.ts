import { Request, Response } from 'express';
import Question from '../models/Question';

const questionController = {
    // Create a new question
    async createQuestion(req: Request, res: Response) {
        try {
            const { question_text, options, correct, category } = req.body;

            const question = new Question({ question_text, options, correct, category });
            await question.save();

            res.status(201).json({ message: 'Question created successfully', question });
        } catch (error) {
            res.status(500).json({ message: 'Error creating question', error });
        }
    },

    // Get all questions
    async getAllQuestions(req: Request, res: Response) {
        try {
            const questions = await Question.find().populate('category');
            res.json(questions);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching questions', error });
        }
    },

    // Get a single question by ID
    async getQuestionById(req: Request, res: Response) {
        try {
            const question = await Question.findById(req.params.id).populate('category');
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }

            res.json(question);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching question', error });
        }
    },

    // Solve a question
    async solveQuestion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const question = await Question.findById(id);

            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }

            await question.increaseSolves();
            res.json({ message: 'Question solved successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error solving question', error });
        }
    }
};

export default questionController;
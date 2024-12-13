import { Request, Response } from 'express';
// import questionService from '../services/questionService';

const questionController = {
    async createQuestion(req: Request, res: Response) {
        // try {
        //     const { questionText, options, correctIndex, category } = req.body;
        //     const result = await questionService.createQuestion(questionText, options, correctIndex, category);
        //     res.status(201).json({ message: 'Question created successfully', result });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },

    async getAllQuestions(req: Request, res: Response) {
        // try {
        //     const questions = await questionService.getAllQuestions();
        //     res.json({ message: 'Questions fetched successfully', result: questions });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },

    async getQuestionById(req: Request, res: Response) {
        // try {
        //     const { id } = req.params;
        //     const question = await questionService.getQuestionById(id);
        //     res.json({ message: 'Question fetched successfully', result: question });
        // } catch (error: any) {
        //     res.status(404).json({ message: error.message });
        // }
    },

    async solveQuestion(req: Request, res: Response) {
        // try {
        //     const { id } = req.params;
        //     const { answerIndex } = req.body;
        //     const userId = (req.user as any).id;

        //     const result = await questionService.solveQuestion(userId, id, answerIndex);
        //     res.json({ message: 'Question solved', result });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },
};

export default questionController;
import express from 'express';
import questionService from '../services/questionService';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { questionText, options, correctIndex, category } = req.body;
        const result = await questionService.createQuestion(questionText, options, correctIndex, category);
        res.status(201).json({ message: "Question created successfully", result });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const result = await questionService.getAllQuestions();
        res.json({ message: "Questions fetched successfully", result });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await questionService.getQuestionById(id);
        res.json({ message: "Question fetched successfully", result });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/:id/solve', async (req, res) => {
    try {
        const { id } = req.params;
        const { answerIndex } = req.body;
        const result = await questionService.solveQuestion("mock-user-id", id, answerIndex);
        res.json({ message: "Question solved", result });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
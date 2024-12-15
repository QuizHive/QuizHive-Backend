import { Request, Response } from "express";
import router from "../routes/v1/questionRoutes";
// import questionService from '../services/questionService';

const questionController = {

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

    async getQuestionsByCategory(req: Request, res: Response) {
        // try {
        //     const { categoryId } = req.params;
        //     const questions = await questionService.getQuestionsByCategory(categoryId);
        //     res.json({ message: 'Questions fetched successfully', result: questions });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },
    
    async createCategory(req: Request, res: Response) {
        // try {
        //     const { categoryName, description } = req.body;
        //     const result = await categoryService.createCategory(categoryName, description);
        //     res.status(201).json({ message: 'Category created successfully', result });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },

    async getAllCategories(req: Request, res: Response) {
        // try {
        //     const categories = await categoryService.getAllCategories();
        //     res.json({ message: 'Categories fetched successfully', result: categories });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },

    async getCategoryById(req: Request, res: Response) {
        // try {
        //     const { id } = req.params;
        //     const category = await categoryService.getCategoryById(id);
        //     res.json({ message: 'Category fetched successfully', result: category });
        // } catch (error: any) {
        //     res.status(404).json({ message: error.message });
        // }
    },

    async updateCategory(req: Request, res: Response) {
        // try {
        //     const { id } = req.params;
        //     const { categoryName, description } = req.body;
        //     const result = await categoryService.updateCategory(id, categoryName, description);
        //     res.json({ message: 'Category updated successfully', result });
        // } catch (error: any) {
        //     res.status(404).json({ message: error.message });
        // }
    },

    async deleteCategory(req: Request, res: Response) {
        // try {
        //     const { id } = req.params;
        //     const result = await categoryService.deleteCategory(id);
        //     res.json({ message: 'Category deleted successfully', result });
        // } catch (error: any) {
        //     res.status(404).json({ message: error.message });
        // }
    },

    async createQuestion(req: Request, res: Response) {
        // try {
        //     const { questionText, options, correctIndex, category } = req.body;
        //     const result = await questionService.createQuestion(questionText, options, correctIndex, category);
        //     res.status(201).json({ message: 'Question created successfully', result });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
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


    /// IMPOTANTS //////**************************************************

    //
    // router.post('/create', async (req, res) => {
    //     try {
    //         const { questionText, options, correctIndex, category } = req.body;
    //         const result = await questionService.createQuestion(questionText, options, correctIndex, category);
    //         res.status(201).json({ message: "Question created successfully", result });
    //     } catch (error: any) {
    //         res.status(500).json({ message: error.message });
    //     }
    // });
    //
    // router.get('/all', async (req, res) => {
    //     try {
    //         const result = await questionService.getAllQuestions();
    //         res.json({ message: "Questions fetched successfully", result });
    //     } catch (error: any) {
    //         res.status(500).json({ message: error.message });
    //     }
    // });
    //
    // router.get('/:id', async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const result = await questionService.getQuestionById(id);
    //         res.json({ message: "Question fetched successfully", result });
    //     } catch (error: any) {
    //         res.status(404).json({ message: error.message });
    //     }
    // });
    //
    // router.post('/:id/solve', async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { answerIndex } = req.body;
    //         const result = await questionService.solveQuestion("mock-user-id", id, answerIndex);
    //         res.json({ message: "Question solved", result });
    //     } catch (error: any) {
    //         res.status(500).json({ message: error.message });
    //     }
    // });
    //

};

export default questionController;
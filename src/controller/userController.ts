import { Request, Response } from "express";
import userService from "../services/userService";

const userController = {
    /**
     * @swagger
     * /users/{userId}/solve:
     *   post:
     *     summary: Marks a question as solved by the user
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SolveQuestionSchema'
     *     responses:
     *       200:
     *         description: Question solved successfully
     *       404:
     *         description: User or question not found
     *       500:
     *         description: Internal server error
     */
    async solveQuestion(req: Request, res: Response) {
        try {
            const { questionId } = req.body;
            const { userId } = req.params;

            const user = await userService.solveQuestion(userId, questionId);
            res.status(200).json({ message: "Question solved successfully", user: user?.getUserInfo() });
        } catch (error : any) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },

    /**
     * @swagger
     * /users/{userId}/score:
     *   get:
     *     summary: Retrieves the user's score
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the user
     *     responses:
     *       200:
     *         description: Successfully retrieved the score
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    async getUserScore(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const score = await userService.getScoreById(userId);
            if (score === null) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ score });
        } catch (error : any) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },

    /**
     * @swagger
     * /users/all:
     *   get:
     *     summary: Retrieves a list of all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Successfully retrieved all users
     *       500:
     *         description: Internal server error
     */
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: (error as any).message });
        }
    },
};

export default userController;
import { Request, Response } from "express";
import userService from "../services/userService";
import {scoreboardSchema} from "../routes/v1/schemas/userSchemas";

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

    /**
     * @swagger
     * /users/scoreboard/{userId}:
     *   get:
     *     summary: Retrieves the top 10 users by score with ranks
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the logged-in user
     *     responses:
     *       200:
     *         description: Successfully retrieved the scoreboard
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 scoreboard:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/UserInfo'
     *                 userRank:
     *                   type: object
     *                   description: Rank and details of the logged-in user (if not in top 10)
     *       400:
     *         description: Bad request (validation error)
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    async getScoreboard(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { error } = scoreboardSchema.validate({ userId });
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const result = await userService.getScoreboard(userId);

            res.status(200).json(result);
        } catch (error : any) {
            if (error.message === "User not found") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error", error: error.message });
            }
        }
    },
};

export default userController;
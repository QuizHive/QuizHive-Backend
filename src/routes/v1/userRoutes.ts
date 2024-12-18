import express from "express";
import userController from "../../controller/userController";
import validator from "../../middleware/validator";
import { solveQuestionSchema } from "./schemas/userSchemas";

const router = express.Router();

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
router.post(
    "/:userId/solve",
    validator(solveQuestionSchema),
    userController.solveQuestion
);

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
router.get("/:userId/score", (userController as any).getUserScore);

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
router.get("/all", userController.getAllUsers);

export default router;

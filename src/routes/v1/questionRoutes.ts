import express from "express";
import {Right} from "../../config/roles";
import questionController from "../../controller/questionController";
import requireAuth from "../../middleware/authMiddleware";
import validator from "../../middleware/validator";
import {createCategorySchema, createQuestionSchema, submitAnswerSchema} from "./schemas/questionSchemas";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions and Categories Management
 */

/**
 * @swagger
 * /questions/categories:
 *   get:
 *     tags: [Questions]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.get("/categories", questionController.getCategories);

/**
 * @swagger
 * /questions/category:
 *   post:
 *     tags: [Questions]
 *     summary: Create a category (Admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryCreatedResponse'
 *       400:
 *         description: Bad request
 *         content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BadRequestResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.post("/category", requireAuth([Right.Manage]), validator(createCategorySchema), questionController.createCategory);

/**
 * @swagger
 * /questions/categories/{id}:
 *   delete:
 *     tags: [Questions]
 *     summary: Delete a category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/id'
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 404
 *               message: Category not found
 */
router.delete("/categories/:id", requireAuth([Right.Manage]), questionController.deleteCategory);

/*********************************** Question Routes ***********************************/

/**
 * @swagger
 * /questions:
 *   get:
 *     tags: [Questions]
 *     summary: Get all questions
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           $ref: '#/components/schemas/id'
 *         description: Category ID
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: number
 *           minimum: 1
 *           maximum: 3
 *           description: Difficulty level
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           minimum: 1
 *           description: Number of questions to return
 *     responses:
 *       200:
 *         description: List of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.get("/", questionController.getQuestions);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     tags: [Questions]
 *     summary: Get a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/id'
 *     responses:
 *       200:
 *         description: Question details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 404
 *               message: Question not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.get("/:id", questionController.getQuestionById);

/**
 * @swagger
 * /questions:
 *   post:
 *     tags: [Questions]
 *     summary: Create a question (Admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuestionSchema'
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionCreatedResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.post("/", requireAuth([Right.Manage]), validator(createQuestionSchema), questionController.createQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     tags: [Questions]
 *     summary: Delete a question (Admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Question ID
 *         schema:
 *           #ref: '#/components/schemas/id'
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       404:
 *         description: Question not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 404
 *               message: Question not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.delete("/:id", requireAuth([Right.Manage]), questionController.deleteQuestion);

/**
 * @swagger
 * /questions/submit:
 *   post:
 *     tags: [Questions]
 *     summary: Solve a question by providing an answer index
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmitAnswerSchema'
 *     responses:
 *       200:
 *         description: Answer checked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isCorrect:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the answer is correct
 *                 gainedScore:
 *                   type: number
 *                   example: 3
 *                   description: Score gained for the correct answer
 *                 message:
 *                   type: string
 *                   example: "Correct!"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestResponse'
 *       404:
 *         description: Question not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 404
 *               message: Question not found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.post("/submit", requireAuth([Right.Play]), validator(submitAnswerSchema), questionController.solveQuestion);

export default router;

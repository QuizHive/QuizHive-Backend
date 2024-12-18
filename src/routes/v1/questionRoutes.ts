import express from "express";
import { Right } from "../../config/roles";
import questionController from "../../controller/questionController";
import requireAuth from "../../middleware/authMiddleware";
import { combineMiddlewares } from "../../middleware/combineMiddlewares";
import validator from "../../middleware/validator";
import { createCategorySchema, createQuestionSchema } from "./schemas/questionSchemas";

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
 *   post:
 *     tags: [Questions]
 *     summary: Create a category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategorySchema'
 *     responses:
 *       201:
 *         description: Category created successfully
 *
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
    "/categories",
    combineMiddlewares(
        requireAuth([Right.Manage]),
        validator(createCategorySchema),
    ),
    questionController.createCategory,
);

/**
 * @swagger
 * /questions:
 *   post:
 *     tags: [Questions]
 *     summary: Create a question
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
    "/",
    combineMiddlewares(
        requireAuth([Right.Manage]),
        validator(createQuestionSchema)
    ),
    questionController.createQuestion
);

/**
 * @swagger
 * /questions:
 *   get:
 *     tags: [Questions]
 *     summary: Get all questions
 *     responses:
 *       200:
 *         description: List of questions
 *       500:
 *         description: Internal server error
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
 *           type: string
 *     responses:
 *       200:
 *         description: Question details
 *       404:
 *         description: Question not found
 */
router.get("/:id", questionController.getQuestionById);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     tags: [Questions]
 *     summary: Delete a question
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Question not found
 */
router.delete(
    "/:id",
    requireAuth([Right.Manage]),
    questionController.deleteQuestion
);

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
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.delete(
    "/categories/:id",
    requireAuth([Right.Manage]),
    questionController.deleteCategory
);
/**
 * @swagger
 * /questions/{id}/solve:
 *   post:
 *     tags: [Questions]
 *     summary: Solve a question by providing an answer index
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [answerIndex]
 *             properties:
 *               answerIndex:
 *                 type: number
 *                 description: The index of the answer selected
 *     responses:
 *       200:
 *         description: Answer checked successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Question not found
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/:id/solve",
    combineMiddlewares(requireAuth([Right.Play])),
    questionController.solveQuestion
);


export default router;

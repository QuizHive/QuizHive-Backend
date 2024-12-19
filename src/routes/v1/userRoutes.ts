import express from "express";
import userController from "../../controller/userController";
import requireAuth from "../../middleware/authMiddleware";
import validator from "../../middleware/validator";
import {getLeaderboardSchema} from "./schemas/userSchemas";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User and profile management, Leaderboard, etc.
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get the user info of the currently logged in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 401
 *               message: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 *
 * /users/info/{user}:
 *   get:
 *     summary: Retrieves a user Info by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           $ref: '#/components/schemas/id'
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 404
 *               message: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.get("/me", requireAuth([]), userController.getUserById);
router.get("/info/:user", userController.getUserById);

/**
 * @swagger
 * /users/leaderboard:
 *   get:
 *     tags: [Users]
 *     summary: Get the leaderboard
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         required: false
 *         description: Number of users to list in the leaderboard (default 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scoreboard:
 *                   type: array
 *                   description: List of users in the leaderboard sorted by score
 *                   items:
 *                     $ref: '#/components/schemas/IScoreboardUser'
 *                 userRank:
 *                   description: The ScoreBoard-info of current user
 *                   $ref: '#/components/schemas/IScoreboardUser'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.get("/leaderboard", requireAuth([]), validator(getLeaderboardSchema), userController.getScoreboard);

export default router;

import express from "express";
import userController from "../../controller/userController";
import requireAuth from "../../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retrieves a user Info by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
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
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 500
 *               message: Internal server error
 */
router.get("/:userId", userController.getUserById);

/**
 * @swagger
 * /users/me:
 *  get:
 *    summary: Get the user info of the currently logged in user
 *    tags: [Users]
 *    responses:
 *      200:
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *            example:
 *              code: 401
 *              message: Unauthorized
 *      500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 500
 *               message: Internal server error
 */
router.get("/me", requireAuth([]), userController.getUserById);

/**
 * @swagger
 * /users/leaderboard:
 *   get:
 *     summary: Get the leaderboard
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: n
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         required: false
 *         description: Number of users to display
 *     responses:
 *       200:
 *         description: Successfully retrieved leaderboard
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               scoreboard:
 *                 schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/IScoreboardUser'
 *               userRank:
 *                 schema:
 *                   $ref: '#/components/schemas/IScoreboardUser'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               code: 500
 *               message: Internal server error
 */
router.get("/leaderboard", requireAuth([]), userController.getScoreboard);

export default router;

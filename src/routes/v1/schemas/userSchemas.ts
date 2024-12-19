import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfo:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/id'
 *           description: User ID (Unique identifier)
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         nickname:
 *           type: string
 *           description: User nickname
 *         score:
 *           type: number
 *           description: User score
 *         role:
 *           type: string
 *           description: User role
 *           enum:
 *             - player
 *             - admin
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation date
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     IScoreboardUser:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/id'
 *           description: User ID (Unique identifier)
 *         rank:
 *           type: number
 *           description: User rank
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         nickname:
 *           type: string
 *           description: User nickname
 *           example: "JohnDoe"
 *         score:
 *           type: number
 *           description: User score
 *         role:
 *           type: string
 *           description: User role
 *           enum:
 *             - player
 *             - admin
 */

export const getLeaderboardSchema = Joi.object({
    limit: Joi.number().default(10),
});

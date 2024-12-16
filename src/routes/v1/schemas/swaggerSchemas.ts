/**
 * @swagger
 * components:
 *   schemas:
 *     BadRequestResponse:
 *       type: object
 *       properties:
 *         messages:
 *           type: array
 *           items:
 *             type: string
 *           description: Error messages
 *           example: ["Invalid input data"]
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: HTTP status code
 *         message:
 *           type: string
 *           description: Error message
 *         stack:
 *           type: string
 *           description: Error stack trace (In development mode)
 *
 *     UserInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
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
 */

export {};

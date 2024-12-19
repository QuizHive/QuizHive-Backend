/**
 * @swagger
 * components:
 *   schemas:
 *     id:
 *       type: string
 *       pattern: "^[0-9a-fA-F]{24}$"
 *       description: Unique identifier Hash 24 characters
 *       example: 6763d664c59ef6511e3e1b9b
 *
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
 *     UnauthorizedErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: HTTP status code
 *           example: 401
 *         message:
 *           type: string
 *           description: Error message
 *           example: Invalid or expired Token
 *
 *     ForbiddenErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: HTTP status code
 *           example: 403
 *         message:
 *           type: string
 *           description: Error message
 *           example: Insufficient permissions
 *
 *     ServerErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: HTTP status code
 *           example: 500
 *         message:
 *           type: string
 *           description: Error message
 *           example: Internal server error
 *         stack:
 *           type: string
 *           description: Error stack trace (In development mode)
 */

export {};

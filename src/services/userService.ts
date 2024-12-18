import ID from "../models/ID";
import {UserModel} from "../models/User";
import {IUserInfo} from "../models/User";

// Interface to define user information structure
const userService = {
    /**
     * @swagger
     * components:
     *   schemas:
     *     SolveQuestionSchema:
     *       type: object
     *       required:
     *         - questionId
     *       properties:
     *         questionId:
     *           type: string
     *           description: The ID of the question to solve
     */
    async getScoreById(id: string): Promise<number | null> {
        const user = await UserModel.findById(id);
        return user?.score || null;
    },

    /**
     * @swagger
     * components:
     *   schemas:
     *     UserInfo:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *         email:
     *           type: string
     *         nickname:
     *           type: string
     *         role:
     *           type: string
     *           enum: [admin, player]
     *         score:
     *           type: integer
     */
    async getAllUsers(): Promise<IUserInfo[]> {
        return UserModel.find({}, "_id email nickname role score");
    },

    /**
     * @swagger
     * components:
     *   schemas:
     *     SolveQuestionRequest:
     *       type: object
     *       required:
     *         - questionId
     *       properties:
     *         questionId:
     *           type: string
     *           description: ID of the question to solve
     */
    async findById(id: string) {
        return UserModel.findById(id);
    },

    async solveQuestion(userId: string, questionId: ID){
        const user = await this.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        await user.solveQuestion(questionId);
        return user;
    },
};

export default userService;
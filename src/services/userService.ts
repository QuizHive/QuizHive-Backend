import ID from "../models/ID";
import {UserModel} from "../models/User";
import {IUserInfo} from "../models/User";
import {IScoreboardUser} from "../models/User";

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

    /**
     * Retrieves the top 10 users sorted by score.
     * If the logged-in user is not in the top 10, their rank is added after the 10th user with their actual rank.
     * @param userId ID of the logged-in user
     * @returns List of top 10 users and the logged-in user with rank
     */
    async getScoreboard(userId: string): Promise<{ scoreboard: IScoreboardUser[]; userRank?: IScoreboardUser }> {
        const topUsers = await UserModel.find()
            .sort({ score: -1 })
            .limit(10)
            .lean();

        let scoreboard: IScoreboardUser[] = topUsers.map((user: any, index: number) => ({
            id: user._id.toString(),
            email: user.email,
            nickname: user.nickname,
            role: user.role,
            score: user.score,
            rank: index + 1,
        }));

        const loggedInUser = await UserModel.findById(userId).lean();
        if (!loggedInUser) {
            throw new Error("User not found");
        }

        let userRank: IScoreboardUser | undefined = undefined;

        // Check if logged-in user is among the top 10
        const userInTop10 = scoreboard.find((u) => u.id === loggedInUser._id.toString());

        if (!userInTop10) {
            const rank = await UserModel.countDocuments({ score: { $gt: loggedInUser.score || 0 } });
            userRank = {
                id: loggedInUser._id.toString(),
                email: loggedInUser.email,
                nickname: loggedInUser.nickname,
                role: loggedInUser.role,
                score: loggedInUser.score,
                rank: rank + 1,
            } as IScoreboardUser;
            // Add the user as the 11th person with their actual rank
            scoreboard.push({ ...userRank, rank: 11 });
        } else {
            userRank = userInTop10;
        }

        return { scoreboard, userRank };
    },
};

export default userService;
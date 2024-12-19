import ID from "../models/ID";
import {IScoreboardUser, User, UserModel} from "../models/User";
import {IUserInfo} from "../models/User";
import {NotFoundError} from "../utils/errors";

// Interface to define user information structure
const userService = {
    async getUserInfo(id: ID) {
        const user = await UserModel.findById(id);
        if (!user)
            throw new NotFoundError("User not found");
        return user.getUserInfo();
    },

    async getAllUsers(): Promise<IUserInfo[]> {
        const users = await UserModel.find();
        return Promise.all(users.map((user) => user.getUserInfo()));
    },

    async findById(id: ID) {
        return UserModel.findById(id);
    },

    /**
     * Retrieves the top n users sorted by score.
     * If the logged-in user is not in the top n, their rank is added after the nth user with their actual rank.
     * @param userId ID of the logged-in user
     * @param n Number of top users to retrieve
     * @returns List of top n users and the logged-in user with rank
     */
    async getScoreboard(userId: ID, n: number): Promise<{ scoreboard: IScoreboardUser[]; userRank?: IScoreboardUser }> {
        const allUsers = ((await UserModel.find()) as User[]);
        const topUsers = allUsers.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, n);

        const scoreboard: IScoreboardUser[] = topUsers.map((user: any, index: number) => ({
            email: user.email,
            id: user._id,
            nickname: user.nickname,
            rank: index + 1,
            role: user.role,
            score: user.score,
        }));

        const loggedInUser = await UserModel.findById(userId);
        if (!loggedInUser)
            throw new NotFoundError("User not found");

        let userRank: IScoreboardUser | undefined = undefined;

        // Check if logged-in user is among the top 10
        const userInTop = scoreboard.find((u) => u.id.equals(loggedInUser.id));
        if (!userInTop) {
            const rank = await UserModel.countDocuments({score: {$gt: loggedInUser.score || 0}});
            userRank = {
                id: loggedInUser._id,
                email: loggedInUser.email,
                nickname: loggedInUser.nickname,
                role: loggedInUser.role,
                score: loggedInUser.score,
                rank: rank + 1,
            } as IScoreboardUser;
            // Add the user as the 11th person with their actual rank
            scoreboard.push(userRank);
        } else {
            userRank = userInTop;
        }
        return {scoreboard, userRank};
    },
};

export default userService;

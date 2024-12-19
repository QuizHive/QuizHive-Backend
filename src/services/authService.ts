import {UserModel} from "../models/User";
import jwtUtils from "../utils/jwt";
import {ConflictError, NotFoundError, UnauthorizedError} from "../utils/errors";

const authService = {
    /**
     *  Register a new user
     * @param email  The email of the user
     * @param passHash  The password hash of the user
     * @param nickname  The nickname of the user
     * @param role  The role of the user (admin, user)
     * @returns  The newly created user
     */
    async registerUser(email: string, passHash: string, nickname: string, role: string) {
        const existing = await UserModel.findOne({email});
        if (existing)
            throw new ConflictError("User already exists");
        const newUser = await UserModel.create({email, passHash, nickname, role, score: 0});
        return newUser.save();
    },

    /**
     * Login a user
     * @param email  The email of the user
     * @param passHash  The password hash of the user
     * @returns  The refresh and access tokens {rToken, aToken}
     */
    async loginUser(email: string, passHash: string) {
        const user = await UserModel.findOne({email});
        if (!user || user.passHash !== passHash) throw new UnauthorizedError("Invalid credentials");
        const rToken = jwtUtils.generateRefreshToken(user.id);
        const aToken = jwtUtils.generateAccessToken(user.id);
        return {rToken, aToken};
    },

    /**
     * Refresh the access token
     * @param rToken  The refresh token of the user
     * @returns  The new access token {aToken}
     */
    async refreshToken(rToken: string) {
        const aToken = jwtUtils.refreshAccessToken(rToken);
        return {aToken};
    },

    // async forgotPassword(email: string) {
    //     // Send email with password reset link
    // },
};

export default authService;

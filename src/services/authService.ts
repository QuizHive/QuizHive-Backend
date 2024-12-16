import {UserModel} from "../models/User";
import jwtUtils from "../utils/jwt";
import {ConflictError, NotFoundError, UnauthorizedError} from "../utils/errors";

const authService = {
    async registerUser(email: string, passHash: string, nickname: string, role: string) {
        const existing = await UserModel.findOne({email});
        if (existing)
            throw new ConflictError("User already exists");
        const newUser = await UserModel.create({email, passHash, nickname, role});
        return newUser.save();
    },

    async loginUser(email: string, passHash: string) {
        const user = await UserModel.findOne({email});
        if (!user || user.passHash !== passHash) throw new UnauthorizedError("Invalid credentials");
        const rToken = jwtUtils.generateRefreshToken(user.id);
        const aToken = jwtUtils.generateAccessToken(user.id);
        return {rToken, aToken};
    },

    async refreshToken(rToken: string) {
        const aToken = jwtUtils.refreshAccessToken(rToken);
        return {aToken};
    },

    async forgotPassword(email: string) {
        // Send email with password reset link
    },
};

export default authService;

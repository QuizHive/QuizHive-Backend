import bcrypt from 'bcrypt';
import config from '../config/config';
import ID from '../models/ID';
import jwtUtils from '../utils/jwt';
import { Role, User, UserModel } from '../models/User';

const userService = {
    async registerUser(email: string, password: string, nickname: string, role: string) {
        const existing = await UserModel.findOne({email});
        if (existing)
            throw new Error('User already exists');

        const hash_password = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({email, hash_password, nickname, role});
        return newUser.save();
    },

    async loginUser(email: string, password: string) {
        // return {'jwt': jwtUtils.generateAccessToken({id:'2', role:'admin'})};
        // const user = await User.findOne({ email });
        // if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        //     throw new Error('Invalid credentials');
        // }

        // const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, { expiresIn: '1h' });
        // return token;
    },

    async getUserProfile(userId: string) {
        // const user = await User.findById(userId).populate(['followers', 'followings']);
        // if (!user) {
        //     throw new Error('User not found');
        // }

        // return user.getUserInfo();
    },

    // async followUser(userId: ID, targetUserId: ID) {
    //     // const user = await User.findById(userId);
    //     // if (!user) throw new Error('User not found');
    //     // await user.follow(targetUserId);
    // },

    // async unfollowUser(userId: string, targetUserId: string) {
    //     // const user = await User.findById(userId);
    //     // if (!user) throw new Error('User not found');
    //     // await user.unfollow(targetUserId);
    // }
};

export default userService;
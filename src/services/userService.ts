import bcrypt from 'bcrypt';
import config from '../config/config';
import ID from '../models/ID';
import jwtUtils from '../utils/jwt';

const userService = {
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
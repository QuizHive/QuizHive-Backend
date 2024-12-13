import {prop, getModelForClass, Ref} from "@typegoose/typegoose";
import ID from "./ID";
import {Question} from "./Question";

export enum Role {
    Player = 'player',
    Admin = 'admin'
}

export interface UserInfo {
    id: string;
    email: string;
    nickname?: string;
    role: Role;
    score?: number;
}

export class User {
    public _id!: ID

    @prop()
    public email!: string;

    @prop()
    public password_hash!: string;

    @prop()
    public nickname?: string;

    @prop()
    public role!: Role;

    @prop({ref: User})
    public followers?: Ref<User>[];

    @prop({ref: User})
    public followings?: Ref<User>[];

    @prop({ref: Question})
    public solved_questions?: Ref<Question>[];

    @prop()
    public score?: number;

    public async follow(target: ID) {
        // if (this.followings?.find((ref) => target.equals(ref.id)))
        //     throw new Error('Already following this user');
        // // Add this user's ID to target user's followers
        // const targetUser = await User.findById(target.toObjectId());
        // if (!targetUser) throw new Error('Target user not found');
        // // Add targetUserId to followings
        // this.followings.push(targetUser);
        // // Add this user's ID to target user's followers
        // targetUser.followers.push(this);
        // await this.save();
        // await targetUser.save();
    }

    public async unfollow(target: ID) {
        // if (!this.followings.includes(targetUserId))
        //     throw new Error('Not following this user');
        // // Remove this user's ID from target user's followers
        // const targetUser = await User.findById(targetUserId);
        // if (!targetUser) throw new Error('Target user not found');
        // // Remove targetUserId from followings
        // this.followings = this.followings.filter((id) => id !== targetUserId);
        // // Remove this user's ID from target user's followers
        // targetUser.followers = targetUser.followers.filter((id) => id !== this._id);
        // await this.save();
        // await targetUser.save();
    }

    public async solveQuestion(questionId: ID) {
        // if (this.solved_questions.includes(questionId))
        //     throw new Error('Question already solved');
        // // Add questionId to solved_questions
        // this.solved_questions.push(questionId);
        //
        // // Increase score by 1
        // // this.score += Question.findById(questionId).correct === 1 ? 1 : 0;
        //
        // await this.save();
    }

    public getUserInfo(): UserInfo {
        return {
            id: this._id.toString(),
            email: this.email,
            nickname: this.nickname,
            role: this.role,
            score: this.score,
        };
    }
}

export const UserModel = getModelForClass(User);

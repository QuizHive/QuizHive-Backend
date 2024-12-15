import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import { Role } from "../config/roles";
import ID from "./ID";
import {Question} from "./Question";

export interface IUserInfo {
    id: string;
    email: string;
    nickname?: string;
    role: Role;
    score?: number;
}

export class User {
    // tslint:disable-next-line:variable-name
    public _id!: ID;

    @prop()
    public email!: string;

    @prop()
    public passHash!: string;

    @prop()
    public nickname?: string;

    @prop()
    public role!: Role;

    @prop({ref: User})
    public followers?: Array<Ref<User>>;

    @prop({ref: User})
    public followings?: Array<Ref<User>>;

    @prop({ref: Question})
    public solvedQuestions?: Array<Ref<Question>>;

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

    public getUserInfo(): IUserInfo {
        return {
            email: this.email,
            id: this._id.toString(),
            nickname: this.nickname,
            role: this.role,
            score: this.score,
        };
    }
}

export const UserModel = getModelForClass(User);

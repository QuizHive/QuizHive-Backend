import mongoose, { Document, Schema } from 'mongoose';
import Question, {IQuestion} from "./Question";

export interface IUserInfo {
    id: IUser['_id'];
    email: string;
    nickname: string;
    role: 'player' | 'admin';
    score: number;
}

export interface IUser extends Document {
    email: string;
    password_hash: string;
    nickname: string;
    role: 'player' | 'admin';
    followers: IUser['_id'][];
    followings: IUser['_id'][];
    solved_questions: IQuestion['_id'][];
    score: number;

    // Instance Methods
    follow(targetUserId: mongoose.Types.ObjectId): Promise<void>;
    unfollow(targetUserId: mongoose.Types.ObjectId): Promise<void>;
    solveQuestion(questionId: mongoose.Types.ObjectId): Promise<void>;
    getUserInfo(): IUserInfo;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    nickname: { type: String, required: true },
    role: { type: String, enum: ['player', 'admin'], required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followings: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    solved_questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    score: { type: Number, default: 0 },
});

// Instance method to follow a user
UserSchema.methods.follow = async function (this: IUser, targetUserId: mongoose.Types.ObjectId) {
    if (this.followings.includes(targetUserId))
        throw new Error('Already following this user');

    // Add this user's ID to target user's followers
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) throw new Error('Target user not found');

    // Add targetUserId to followings
    this.followings.push(targetUserId);

    // Add this user's ID to target user's followers
    targetUser.followers.push(this.id);

    await this.save();
    await targetUser.save();
};

// Instance method to unfollow a user
UserSchema.methods.unfollow = async function (this: IUser, targetUserId: mongoose.Types.ObjectId) {
    if (!this.followings.includes(targetUserId))
        throw new Error('Not following this user');

    // Remove this user's ID from target user's followers
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) throw new Error('Target user not found');

    // Remove targetUserId from followings
    this.followings = this.followings.filter((id) => id !== targetUserId);
    // Remove this user's ID from target user's followers
    targetUser.followers = targetUser.followers.filter((id) => id !== this._id);

    await this.save();
    await targetUser.save();
};

// Instance method to solve a question
UserSchema.methods.solveQuestion = async function (this: IUser, questionId: mongoose.Types.ObjectId) {
    if (this.solved_questions.includes(questionId))
        throw new Error('Question already solved');

    // Add questionId to solved_questions
    this.solved_questions.push(questionId);

    // Increase score by 1
    // this.score += Question.findById(questionId).correct === 1 ? 1 : 0;

    await this.save();
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

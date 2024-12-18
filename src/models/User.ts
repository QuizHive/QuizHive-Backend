import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import { Role } from "../config/roles";
import ID from "./ID";
import {Question} from "./Question";

// Interface to define user information structure
export interface IUserInfo {
    id: string;
    email: string;
    nickname?: string;
    role: Role;
    score?: number;
}

// Class representing a User entity
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

    /**
     * Marks a question as solved and updates the user score.
     * @param questionId ID of the question to solve
     */
    public async solveQuestion(questionId: ID): Promise<void> {
        if (!this.solvedQuestions) {
            this.solvedQuestions = [];
        }

        if (this.solvedQuestions.includes(questionId as any)) {
            throw new Error("Question already solved");
        }

        const question = await (Question as any).findById(questionId);
        if (!question) {
            throw new Error("Question not found");
        }

        this.solvedQuestions.push(questionId as any);

        if (question.correct) {
            this.score = (this.score || 0) + 1;
        }

        // await this.save();
    }

    /**
     * Retrieves essential user information.
     * @returns IUserInfo object containing user details
     */
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

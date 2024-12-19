import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {Role} from "../config/roles";
import ID from "./ID";

// Interface to define user information structure
export interface IUserInfo {
    id: ID;
    email: string;
    nickname?: string;
    role: Role;
    score?: number;
    createdAt: Date;
}

export interface IScoreboardUser {
    rank: number;
    id: ID;
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
    public followers!: Array<Ref<User>>;

    @prop({ref: User})
    public followings!: Array<Ref<User>>;

    @prop()
    public score!: number;

    @prop()
    public createdAt!: Date;

    /**
     * Retrieves essential user information.
     * @returns IUserInfo object containing user details
     */
    public getUserInfo(): IUserInfo {
        return {
            email: this.email,
            id: this._id,
            nickname: this.nickname,
            role: this.role,
            score: this.score,
            createdAt: this.createdAt,
        };
    }
}

export const UserModel = getModelForClass(User);

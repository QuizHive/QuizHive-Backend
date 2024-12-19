import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import ID from "./ID";
import {Question} from "./Question";
import {User} from "./User";

// A submit entity
export class Submit {
    public _id!: ID;

    @prop({ref: "Question"})
    public question!: Ref<Question>;

    @prop({ref: "User"})
    public user!: Ref<User>;

    @prop({required: true})
    public choice!: number;

    @prop({required: true})
    public isCorrect!: boolean;

    @prop({required: true})
    public gainedScore!: number;

    @prop({required: true})
    public timestamp!: Date;
}

export const SubmitModel = getModelForClass(Submit);

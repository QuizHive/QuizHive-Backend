import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import ID from "./ID";

export enum Difficulty {
    Easy = 1,
    Medium = 2,
    Hard = 3,
}

export class Category {
    public _id!: ID;

    @prop({required: true})
    public categoryName!: string;

    @prop()
    public description!: string;
}

export const CategoryModel = getModelForClass(Category);

export class Question {
    public _id!: ID;

    @prop({required: true})
    public title!: string;

    @prop()
    public text!: string;

    @prop({type: () => [String], required: true})
    public options!: string[];

    @prop({required: true})
    public correct!: number;

    @prop({ref: Category})
    public category!: Ref<Category>;

    @prop()
    public solves!: number;

    @prop()
    public difficulty!: Difficulty;

    @prop()
    public createdAt!: Date;

    /* This field is used to store the last choice made by the user
    *  so that we can show it to the user when he comes back to the question
    * (This field is not stored in the database, it's temporary)
    */
    public lastChoiceByUser?: number;
}

export const QuestionModel = getModelForClass(Question);

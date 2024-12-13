import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import ID from "./ID";

export enum Difficulty {
    Easy = 1,
    Medium = 2,
    Hard = 3
}

export class Category {
    @prop()
    public _id!: ID;

    @prop()
    public category_name!: string;

    @prop()
    public description!: string;
}

export const CategoryModel = getModelForClass(Category);

export class Question {
    @prop()
    public _id!: ID;

    @prop()
    public question_text!: string;

    @prop()
    public options!: string[];

    @prop()
    public correct!: number;

    @prop({ref: Category})
    public category!: Ref<Category>;

    @prop()
    public solves!: number;

    @prop()
    public difficulty!: Difficulty;
}

export const QuestionModel = getModelForClass(Question);

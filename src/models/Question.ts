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
}

export const QuestionModel = getModelForClass(Question);

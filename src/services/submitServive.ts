import ID from "../models/ID";
import {QuestionModel} from "../models/Question";
import {SubmitModel} from "../models/Submit";
import {User, UserModel} from "../models/User";
import {NotFoundError} from "../utils/errors";

const submitService = {
    /**
     * Solve a question (check the answer).
     */
    async submit(userId: ID, questionId: ID, choice: number) {
        const question = await QuestionModel.findById(questionId);
        const user = await UserModel.findById(userId) as User;
        if (!question)
            throw new NotFoundError("Question not found");
        if (!user)
            throw new NotFoundError("User not found");
        const isCorrect = question.correct === choice;
        const gainedScore = isCorrect ? question.difficulty : 0;
        const submitRecord = await SubmitModel.create({
            question,
            user,
            choice,
            isCorrect,
            gainedScore,
            timestamp: new Date()
        });
        await UserModel.findByIdAndUpdate(userId, {$inc: {score: gainedScore}});
        await QuestionModel.findByIdAndUpdate(questionId, {$inc: {solves: isCorrect ? 1 : 0}});
        await submitRecord.save();
        return SubmitModel.findById(submitRecord._id);
    },

    /**
     * Get all submissions of a user for a question.
     */
    async getSubmissions(filters: {
        userId?: ID,
        questionId?: ID,
        isCorrect?: boolean,
        limit?: number,
        after?: Date,
        before?: Date,
    }) {
        const {userId, questionId, isCorrect, limit, after, before} = filters;
        const query: any = {};
        if (userId)
            query.user = userId;
        if (questionId)
            query.question = questionId;
        if (isCorrect !== undefined)
            query.isCorrect = isCorrect;
        if (after)
            query.timestamp = {...query.timestamp, $gte: after};
        if (before)
            query.timestamp = {...query.timestamp, $lte: before};
        return SubmitModel.find(query).limit(limit || 10);
    },
};

export default submitService;

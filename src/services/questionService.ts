import Question from '../models/Question';
import ID from '../models/ID';

const questionService = {
    async createQuestion(questionText: string, options: string[], correctIndex: number, category: string) {
        const question = new Question({
            question_text: questionText,
            options,
            correct: correctIndex,
            category: ID.from(category).toObjectId(),
        });
        return question.save();
    },

    async getAllQuestions() {
        return Question.find().populate('category');
    },

    async getQuestionById(questionId: string) {
        const question = await Question.findById(ID.from(questionId).toObjectId()).populate('category');
        if (!question) {
            throw new Error('Question not found');
        }
        return question;
    },

    async solveQuestion(userId: string, questionId: string, answerIndex: number) {
        const question = await Question.findById(ID.from(questionId).toObjectId());
        if (!question) {
            throw new Error('Question not found');
        }

        const isCorrect = question.correct === answerIndex;
        if (isCorrect) {
            await question.updateOne({ $inc: { solves: 1 } });
        }

        return { correct: isCorrect };
    },
};

export default questionService;
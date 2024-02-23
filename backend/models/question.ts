import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    points: { type: Number, required: true },
    difficulty: { type: String, required: true }
});

mongoose.model("Question", QuestionSchema);
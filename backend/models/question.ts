import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    body: { type: String, required: true },
    types: { type: String, required: true},
    points: { type: Number, required: true }
});

const Question = mongoose.model("QuestionSchema");
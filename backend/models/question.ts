import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    points: { type: Number, required: true },
    difficulty: { type: String, required: true },
    total_cases: { type: Number, required: true },
    display_id: { type: Number, required: true },
    samples: {type: String, required: true},
    set: {type: String, required: true}
    // sample_input: { type: Array, required: true },
    // sample_output: { type: Array, required: true }
});

mongoose.model("Question", QuestionSchema);
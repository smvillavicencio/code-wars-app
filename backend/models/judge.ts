import mongoose from 'mongoose';

const JudgeSchema = new mongoose.Schema({
  judge_name: { type: String, required: true },
  password: { type: String, required: true }
});

mongoose.model("Judge", JudgeSchema);
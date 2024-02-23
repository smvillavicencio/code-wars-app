import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  team_id: { type: String, required: true },
  team_name: { type: String, required: true },
  judge_id: { type: String, required: true },
  judge_name: { type: String, required: true },
  problem_id: { type: String, required: true },
  problem_title: { type: String, required: true },
  possible_points: { type: Number, required: true },
  status: { type: String, required: true },
  score: { type: Number, required: true },
  evaluation: { type: String, required: true },
  timestamp: { type: Date, required: true },
  content: { type: String, required: true },
  prev_max_score: { type: Number, required: true }, // Max score of previous submissions to the same problem by the same team
  total_test_cases: { type: Number, required: true },
  curr_correct_cases: { type: Number, required: true },
  filename: { type: String, required: true }
});
// status : checked, error, pending
// evaluation: correct, partial, wrong, error, pending

mongoose.model("Submission", SubmissionSchema);
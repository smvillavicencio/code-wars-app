import mongoose from 'mongoose';

const LeaderboardsSchema = new mongoose.Schema({
    rank: { type: Number, required: true },
    teamName: { type: String, required: true},
    score: { type: Number, required: true },
    totalScore: { type: Number, required: true }
});

mongoose.model("Leaderboard", LeaderboardsSchema);
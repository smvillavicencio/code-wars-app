import { Request, Response } from 'express';
import mongoose from 'mongoose';

const Team = mongoose.model("Team");


/*
 * Purpose: Retrieve scores of all teams in descending order
 */
const retrieveLeaderboards = async (args: any) => {
    try {
        // const leaderboard = await Team.find({}).sort({score: -1});
        const leaderboard = await Team.find({}).select("rank team_name score total_points_used");
        console.log(leaderboard);
        return ({ success: true, leaderboard });
    }catch(err) {
        console.error(err);
        return ({ success: false, error: err });
    }
}

export { retrieveLeaderboards }
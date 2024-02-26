import { Request, Response } from 'express';
import mongoose from 'mongoose';

const Team = mongoose.model("Team");


/*
 * Purpose: Retrieve scores of all teams in descending order
 */
const retrieveLeaderboards = async (req : any, res : any) => {
    try {
        // const leaderboard = await Team.find({}).sort({score: -1});
        // const leaderboard = await Team.find({}).select("rank team_name score total_points_used");
        const leaderboard = await Team.find({}).select("team_name score total_points_used");
        // console.log(leaderboard);
        return res.send({ success: true, leaderboard });
    }catch(err) {
        console.error(err);
        return res.send({ success: false, error: err });
    }
}

export { retrieveLeaderboards }
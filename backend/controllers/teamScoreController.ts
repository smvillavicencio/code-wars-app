import { Request, Response } from 'express';
import mongoose from 'mongoose';

// get user model registered in Mongoose
const Team = mongoose.model("Team");

/*
 * Purpose: View a team's score given their id
 * Params (in the Request): teamId
 * Returns (in the Response): 
 *      Object with fields success and either score (if no error) or message
 */
const viewTeamScoreById = async (req: Request, res: Response) => {
    var results;
    try {
        results = await Team.findById(req.body.teamId).select("score");    
    } catch (error) {
        return res.send({
            success: false,
            message: error
        });    
    }

    if (!results) {
        return res.send({
            success: false,
            message: "Team not found"
        });
    }
    
    return res.send({
        success: true,
        score: results
    });
}

export { viewTeamScoreById };
import { Request, Response } from 'express';
import mongoose from 'mongoose';

// get user model registered in Mongoose
const Team = mongoose.model("Team");

/*
 * Purpose: Get a list of all teams in the database
 * Params (in the Request): None
 * Returns (in the Response): 
 *      Object with fields success and either teams (if no error) or message
 */
const getAllTeams = async (req: Request, res: Response) => {
    try {
        const results = await Team.find({});
        return res.send({
            success: true,
            teams: results
        }); 
    } catch (error) {
        return res.send({
            success: false,
            message: error
        });
    }
}

export { getAllTeams };
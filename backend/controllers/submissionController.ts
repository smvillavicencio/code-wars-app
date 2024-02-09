import { Request, Response } from 'express';
import mongoose from 'mongoose';

// get user model registered in Mongoose
const Submission = mongoose.model("Submission");

/*
    ENDPOINTS:
    - uploadSubmission
    - downloadSubmission
    - checkSubmission
    - viewSubmissionsTP (based on Team and current Problem)
*/

/*
 * Purpose: Upload submission
 * Params (in the Request): problemId, teamId, teamName, judgeId, judgeName, (max)possiblePoints, (file)content
 * Returns (in the Response): 
 *      Object with fields success and the corresponding results
 */
const uploadSubmission = async (req: Request, res: Response) => {
    const problemId = req.body.problemId;
    const teamId = req.body.teamId;
    const teamName = req.body.teamName;
    const judgeId = req.body.judgeId;
    const judgeName = req.body.judgeName;
    const possiblePoints = req.body.possiblePoints;
    const content = req.body.content;

    const newSubmission = new Submission({
        team_id: teamId,
        team_name: teamName,
        judge_id: judgeId,
        judge_name: judgeName,
        problem_id: problemId,
        possible_points: possiblePoints,
        status: "pending",
        score: 0,
        evaluation: "pending",
        timestamp: new Date(),
        content: content
    })
    // status : checked, error, pending
    // evaluation: correct, partial, wrong, error, pending

    let results;
    try {
        results = await newSubmission.save();
    } catch (error) {
        return res.send({
            success: false,
            results: error
        });
    }
    
    return res.send({
        success: true,
        results: results
    });
}

/*
 * Purpose: Download submission
 * Params (in the Request): submissionId
 * Returns (in the Response): 
 *      Object with fields success and the corresponding results
 */
const downloadSubmission = async (req: Request, res: Response) => {
    const submissionId = req.body.submissionId;

    const submission = await Submission.findById(submissionId).select("content");

    if (submission) {
        return res.send({
            success: true,
            results: submission.content
        });
    } else {
        return res.send({
            success: false,
            results: "Submission not found"
        });
    }
}

/*
 * Purpose: Check or grade  (changes fields status, evaluation, and score)
 * Params (in the Request): submissionId, evaluation (correct, partial, wrong, error)
 * Returns (in the Response): 
 *      Object with fields success and the corresponding results
 */
const checkSubmission = async (req: Request, res: Response) => {
    const submissionId = req.body.submissionId;
    const evaluation = req.body.evaluation;

    // status : checked, error, pending
    // evaluation: correct, partial, wrong, error, pending
    let submission = await Submission.findById(submissionId);

    if (submission) {
        submission.evaluation = evaluation;
        let status;
        let score = 0;

        if (evaluation == "error") {
            status = "error"
        } else {
            status = "checked"
        }

        if (evaluation == "correct") {
            score = submission.possible_points;
        }
        // TODO: Insert logic for partial points
        // The total current score for the team may also be calculated here

        submission.status = status;
        submission.score = score;

        try {
            submission.save();

            return res.send({
                success: true,
                results: submission
            });

        } catch (error) {
            return res.send({
                success: false,
                results: "Failed checking submission"
            });
        }

    } else {
        return res.send({
            success: false,
            results: "Submission not found"
        });
    }
}

/*
 * Purpose: View submissions based on team and on problem
 * Params (in the Request): problemId, teamId
 * Returns (in the Response): 
 *      Object with field results containing the appropriate submissions
 */
const viewSubmissionsTP = async (req: Request, res: Response) => {
    const problemId = req.body.problemId;
    const teamId = req.body.teamId;

    const results = await Submission.find({ team_id: teamId, problem_id: problemId }).sort({ timestamp: 1 });

    return res.send({
        results: results
    });
}

export { uploadSubmission, downloadSubmission, checkSubmission, viewSubmissionsTP };
import { Request, Response } from 'express';
import mongoose from 'mongoose';


const Question = mongoose.model("Question");

const viewQuestions = async (req : any, res : any) => {
    try {
        const questions = await Question.find({}).exec();
        return res.send({ success: true, questions });
    }catch(err) {
        console.error(err);
        return res.send({ success: false, error: err });
    }
  }

export { viewQuestions }
import { Request, Response } from 'express';
import mongoose from 'mongoose';


const Question = mongoose.model("Question");

const viewQuestions = async (req : any, res : any) => {
    try {
        const questions = await Question.find({});
        return res.send({ success: true, questions });
    }catch(err) {
        console.error(err);
        return res.send({ success: false, error: err });
    }
  }

const getQuestionsBasedOnDifficulty = async (req : any, res : any) => {
    const difficulty = req.body.difficulty.trim();

    try {
        const questions = await Question.find({ difficulty: difficulty }).sort({ points: 1 });
        return res.send({ success: true, questions });
    }catch(err) {
        console.error(err);
        return res.send({ success: false, error: err });
    }
  } 

const getQuestionContent = async (req : any, res : any) => {
    const id = req.body.id.trim();

    try {
        const question = await Question.findById(id);
        return res.send({ success: true, question });
    }catch(err) {
        console.error(err);
        return res.send({ success: false, error: err });
    }
  } 

export { viewQuestions, getQuestionsBasedOnDifficulty, getQuestionContent }
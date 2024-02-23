import { Request, Response } from 'express';
import mongoose from 'mongoose';


const Question = mongoose.model("Question");

const viewQuestions = (req : any, res : any) => {
    Question.find({types: req}, (err : any, question : any) => { 
        if(!err) {
            return res.send({ success: true, posts: question });
        } else {
            return res.send({ success: false });
        }
    });
  }

export { viewQuestions }
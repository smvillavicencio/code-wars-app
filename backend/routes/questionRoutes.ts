import { Router } from 'express';
import { viewQuestions, getQuestionsBasedOnDifficulty, getQuestionContent, generateQuestion } from '../controllers/questionsController';

const router = Router();

router.get('/viewquestions', viewQuestions);
router.post('/viewquestionsdiff', getQuestionsBasedOnDifficulty);
router.post('/viewquestioncontent', getQuestionContent);
router.post('/generatequestion', generateQuestion);

export default router;
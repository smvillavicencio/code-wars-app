import { Router } from 'express';
import { viewQuestions, getQuestionsBasedOnDifficulty, getQuestionContent } from '../controllers/questionsController';

const router = Router();

router.get('/viewquestions', viewQuestions);
router.post('/viewquestionsdiff', getQuestionsBasedOnDifficulty);
router.post('/viewquestioncontent', getQuestionContent);

export default router;
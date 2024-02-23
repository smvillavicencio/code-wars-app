import { Router } from 'express';
import { viewQuestions } from '../controllers/questionsController';

const router = Router();

router.get('/viewQuestions', viewQuestions);

export default router;
import { Router } from 'express';
import { viewQuestions } from '../controllers/questionsController';

const router = Router();

router.post('/viewQuestions', viewQuestions);

export default router;
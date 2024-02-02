import { Router } from 'express';
import { checkIfLoggedIn } from '../controllers/authController';

const router = Router();

router.post('/checkIfLoggedIn', checkIfLoggedIn);

export default router;
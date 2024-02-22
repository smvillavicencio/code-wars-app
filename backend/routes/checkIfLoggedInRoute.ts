import { Router } from 'express';
import { checkIfLoggedIn } from '../controllers/authController';

const router = Router();

router.post('/checkifloggedin', checkIfLoggedIn);

export default router;
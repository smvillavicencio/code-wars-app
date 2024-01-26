import { Router } from 'express';
import { viewTeamScoreById } from '../controllers/teamScoreController';

const router = Router();

router.post('/viewteamscore', viewTeamScoreById);

export default router;
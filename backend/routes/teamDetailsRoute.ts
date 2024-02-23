import { Router } from 'express';
import { getAllTeams } from '../controllers/teamDetailsController';

const router = Router();

router.get('/teams', getAllTeams);

export default router;
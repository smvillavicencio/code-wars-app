import { Router } from 'express';
import { getAllTeams, getTeamDetailsById } from '../controllers/teamDetailsController';

const router = Router();

router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamDetailsById);

export default router;
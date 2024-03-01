import { Router } from 'express';
import { getAllTeams, getTeamDetailsById, getTeamSets } from '../controllers/teamDetailsController';

const router = Router();

router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamDetailsById);
router.post('/teamsets', getTeamSets);

export default router;
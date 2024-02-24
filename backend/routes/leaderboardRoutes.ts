import { Router } from 'express';
import { retrieveLeaderboards } from '../controllers/leaderboardController';

const router = Router();

router.get('/viewLeaderboard', retrieveLeaderboards);

export default router;
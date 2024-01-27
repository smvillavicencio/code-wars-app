import { Router } from 'express';
import { get_all_powerups , get_powerups_by_type, get_powerup_by_id, get_available_powerups } from "../controllers/powerupController";

const router = Router();

router.get('/', get_all_powerups);
router.get('/available', get_available_powerups);
router.get('/:type', get_powerups_by_type);
router.get('/:id', get_powerup_by_id);

export default router;

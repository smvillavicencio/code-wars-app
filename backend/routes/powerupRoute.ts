import { Router } from 'express';
import { get_all_powerups , get_powerups_by_type, get_powerup_by_id, get_available_powerups, buy_powerup } from "../controllers/powerupController";

const router = Router();

router.get('/powerups/', get_all_powerups);
router.post('/powerups/buy', buy_powerup);
router.post('/powerups/available', get_available_powerups);
// router.get('powerups/:type', get_powerups_by_type);
router.get('/powerups/:id', get_powerup_by_id);

export default router;
 
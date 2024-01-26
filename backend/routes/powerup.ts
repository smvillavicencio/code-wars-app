import { Router } from 'express';
import { getPowerupsByType, getPowerupById } from "../controllers/powerupController";

const router = Router();

router.post('/', getPowerupsByType);
router.get('/:id', getPowerupById);

export default router;

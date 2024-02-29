import { Router } from 'express';
import { commandChannel, setAdminCommand, setBuyImmunity } from '../controllers/adminController';

const router = Router();

router.get('/admincommand', commandChannel);
router.post('/setcommand', setAdminCommand);
router.post('/set-buy-immunity', setBuyImmunity);

export default router;
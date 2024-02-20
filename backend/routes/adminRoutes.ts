import { Router } from 'express';
import { commandChannel, setAdminCommand } from '../controllers/adminController';

const router = Router();

router.get('/admincommand', commandChannel);
router.post('/setcommand', setAdminCommand);

export default router;
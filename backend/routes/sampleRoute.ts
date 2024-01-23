import { Router } from 'express';
import { getSampleData } from '../controllers/sampleController';

const router = Router();

router.get('/sample', getSampleData);

export default router;

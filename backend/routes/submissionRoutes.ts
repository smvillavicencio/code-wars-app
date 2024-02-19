import { Router } from 'express';
import { uploadSubmission, downloadSubmission, checkSubmission, viewSubmissionsTP } from '../controllers/submissionController';

const router = Router();

router.post('/uploadsubmission', uploadSubmission);
router.post('/downloadsubmission', downloadSubmission);
router.post('/checksubmission', checkSubmission);
router.post('/viewsubmissions', viewSubmissionsTP);

export default router;
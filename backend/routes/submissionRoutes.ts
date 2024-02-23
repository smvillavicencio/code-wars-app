import { Router } from 'express';
import { uploadSubmission, downloadSubmission, checkSubmission, viewSubmissionsTP, getAllSubmissions } from '../controllers/submissionController';

const router = Router();

router.post('/uploadsubmission', uploadSubmission);
router.post('/downloadsubmission', downloadSubmission);
router.post('/checksubmission', checkSubmission);
router.post('/viewsubmissions', viewSubmissionsTP);
router.get('/getallsubmissions', getAllSubmissions);

export default router;
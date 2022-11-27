import { Router } from 'express';
import controller from '../controllers/visitors';

const router = Router();

router.get('/visitors', controller.getVisitors);

export default router;

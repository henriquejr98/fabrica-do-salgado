import { Router } from 'express';

import fotoController from '../controllers/foto';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, fotoController.store);

export default router;

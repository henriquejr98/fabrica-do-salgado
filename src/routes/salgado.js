import { Router } from 'express';
import SalgadoController from '../controllers/salgado';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', SalgadoController.index);
router.post('/', loginRequired, SalgadoController.store);

export default router;

import { Router } from 'express';
import ClienteController from '../controllers/cliente';

const router = new Router();

router.post('/', ClienteController.store);

export default router;

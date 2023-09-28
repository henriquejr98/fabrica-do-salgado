import { Router } from 'express';
import pedidoController from '../controllers/pedido';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
router.post('/', pedidoController.store);
router.put('/', pedidoController.update);
router.get('/', pedidoController.index);
router.post('/fechar', loginRequired, pedidoController.fecharPedidos);

export default router;

import { Router } from 'express';
import userController from '../controllers/user';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// router.get('/', loginRequired, userController.index);
// router.get('/:id', userController.show);
// router.put('/:id', userController.update);
// router.delete('/:id', userController.delete);
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo user -> POST
delete -> apaga user -> DELETE
show -> mostra user -> GET
update -> atualiza user -> PATCH ou PUT
*/

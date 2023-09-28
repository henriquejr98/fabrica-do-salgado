import Sequelize, { Model } from 'sequelize';
import Salgado from './Salgado';
import Pedido from './Pedido';

export default class PedidoSalgado extends Model {
  static init(sequelize) {
    super.init({
      quantidade: {
        type: Sequelize.INTEGER,
      },
      salgado_id: {
        type: Sequelize.INTEGER,
        references: {
          model: Salgado,
          key: 'id',
        },
      },
      pedido_id: {
        type: Sequelize.INTEGER,
        references: {
          model: Pedido,
          key: 'id',
        },
      },
    }, {
      underscored: true,
      // paranoid: true,
      sequelize,
    });
    return this;
  }
}

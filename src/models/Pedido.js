import Sequelize, { Model } from 'sequelize';

export default class Pedido extends Model {
  static init(sequelize) {
    super.init({
      valorPedido: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      statusPagamento: {
        type: Sequelize.ENUM('Nâo pago', 'Pago'),
        defaultValue: 'Não pago',
      },
      statusEntrega: {
        type: Sequelize.ENUM('Não entregado', 'Entregado'),
        defaultValue: 'Não entregado',
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dataEntrega: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      // paranoid: true,
      underscored: true,
      sequelize,
    });
    return this;
  }

  // Associações
  static associate(models) {
    // Associação Muitos-para-Muitos com Salgado
    this.belongsToMany(models.Salgado, {
      through: 'pedido_salgados',
      foreignKey: 'pedidoId',
      as: 'Salgados',
      otherKey: 'salgadoId',
    });

    // Associação com Cliente (Um pedido pertence a um cliente)
    this.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
    });
  }
}

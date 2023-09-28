import Sequelize, { Model } from 'sequelize';

export default class Salgado extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres.',
          },
        },
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Descrição precisa ter entre 3 e 255 caracteres.',
          },
        },
        allowNull: false,
      },
    }, {
      // paranoid: true,
      underscored: true,
      sequelize,
    });
    return this;
  }

  static associate(models) {
    // Associação Muitos-para-Muitos com Salgado
    this.belongsToMany(models.Pedido, {
      through: 'pedido_salgados',
      foreignKey: 'salgadoId',
      as: 'Pedidos',
      otherKey: 'pedidoId',
    });

    this.hasMany(models.Foto, { foreignKey: 'salgadoId' });
  }
}

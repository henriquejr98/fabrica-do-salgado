import Sequelize, { Model } from 'sequelize';

export default class Cliente extends Model {
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
      },
      telefone: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          len: {
            args: [8, 12],
            msg: 'Telefone precisa ter entre 8 e 12 caracteres.',
          },
        },
      },
      endereco: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 255],
            msg: 'Endereço precisa ter entre 5 e 255 caracteres.',
          },
        },
      },
    }, {
      // paranoid: true,
      underscored: true,
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Pedido, { foreignKey: 'clienteId' });
  }
}

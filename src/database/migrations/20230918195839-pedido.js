/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      valor_pedido: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status_pagamento: {
        type: Sequelize.ENUM('Não pago', 'Pago'),
        allowNull: false,
      },
      status_entrega: {
        type: Sequelize.ENUM('Não entregado', 'Entregado'),
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clientes', key: 'id' },
        allowNull: false,
      },
      data_entrega: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('pedidos');
  },
};

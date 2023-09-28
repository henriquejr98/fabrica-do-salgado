/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedido_salgados', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      salgado_id: {
        type: Sequelize.INTEGER,
        references: { model: 'salgados', key: 'id' },
        allowNull: false,
      },
      pedido_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pedidos', key: 'id' },
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('pedido_salgados');
  },
};

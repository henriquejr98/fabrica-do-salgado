/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('salgados', [
      {
        nome: 'Troxinha de frango',
        descricao: 'Frango e Catupiry',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down() { },
};

// npx sequelize db:seed:all

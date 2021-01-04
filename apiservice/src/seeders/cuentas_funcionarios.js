'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Funcionarios', [
      {
        cargo: 'Súper Administrado',
        usuario_id: 659,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargo: 'Súper Administrador',
        usuario_id: 660,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Funcionarios', null, {});
  }
};

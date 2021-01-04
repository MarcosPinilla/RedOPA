'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Funcionarios', [
      {
        cargo: 'Desarrollador',
        usuario_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargo: 'Desarrollador',
        usuario_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargo: 'Súper admin',
        usuario_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargo: 'Súper admin',
        usuario_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargo: 'Súper admin',
        usuario_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Funcionarios', null, {});
  }
};

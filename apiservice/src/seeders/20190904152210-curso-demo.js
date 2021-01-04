'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cursos', [
      {
        nivel: 1,
        letra: 'A',
        institucion_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nivel: 1,
        letra: 'B',
        institucion_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cursos', null, {});
  }
};

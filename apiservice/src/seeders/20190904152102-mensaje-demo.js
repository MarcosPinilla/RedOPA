'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Mensajes', [
      {
        mensaje: 'Primer mensaje de prueba',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mensaje: 'Segundo mensaje de prueba',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mensaje: 'Tercer mensaje de prueba',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Mensajes', null, {});
  }
};

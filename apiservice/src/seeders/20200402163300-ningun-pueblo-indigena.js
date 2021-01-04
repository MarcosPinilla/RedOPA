'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pueblos_indigenas', [
      {
        nombre: 'Ninguno',
        descripcion: 'Ninguno',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pueblos_indigenas', null, {});
  }
};

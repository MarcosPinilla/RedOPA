'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Generos', [
      {
        nombre: 'Masculino',
        descripcion: 'Usuario con género masculino',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Femenino',
        descripcion: 'Usuario con género femenino',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Generos', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Permisos', [
      {
        nombre: 'Normal',
        descripcion: 'Usuario con acceso normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Admin',
        descripcion: 'Usuario con acceso a plataforma de institución',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Súper Admin',
        descripcion: 'Usuario con acceso a plataforma global',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permisos', null, {});
  }
};

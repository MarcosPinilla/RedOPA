'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Minorias', [
      {
        nombre: 'LGBTQ+',
        descripcion: 'Minoría Sexual',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Etnia',
        descripcion: 'Pertenece a alguna etnia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Religión',
        descripcion: 'Minoría religiosa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Otra',
        descripcion: 'Otra minoría no mencionada',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ninguna',
        descripcion: 'No se identifica con ninguna minoría',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Minorias', null, {});
  }
};

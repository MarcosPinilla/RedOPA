'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orientaciones_sexuales', [
      {
        nombre: 'Heterosexual',
        descripcion: 'Heterosexual',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Homosexual',
        descripcion: 'Homosexual (Gay / Lesbiana)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Bisexual',
        descripcion: 'Bisexual',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'No sabe / No responde',
        descripcion: 'No sabe / No responde',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orientaciones_sexuales', null, {});
  }
};

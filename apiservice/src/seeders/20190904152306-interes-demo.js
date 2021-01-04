'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Intereses', [
      {
        nombre: 'Fútbol',
        descripcion: 'Interés relacionado a fútbol',
        categoria_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Jazz',
        descripcion: 'Interés relacionado a jazz',
        categoria_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Iglesia Católica',
        descripcion: 'Interés relacionado a iglesia católica',
        categoria_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Intereses', null, {});
  }
};

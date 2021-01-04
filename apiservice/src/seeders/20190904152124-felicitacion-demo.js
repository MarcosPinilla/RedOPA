'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Felicitaciones', [
      {
        fecha: new Date(),
        usuario_emisor_id: 1,
        usuario_receptor_id: 2,
        mensaje_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fecha: new Date(),
        usuario_emisor_id: 1,
        usuario_receptor_id: 2,
        mensaje_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fecha: new Date(),
        usuario_emisor_id: 1,
        usuario_receptor_id: 3,
        mensaje_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fecha: new Date(),
        usuario_emisor_id: 4,
        usuario_receptor_id: 2,
        mensaje_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fecha: new Date(),
        usuario_emisor_id: 4,
        usuario_receptor_id: 3,
        mensaje_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Felicitaciones', null, {});
  }
};

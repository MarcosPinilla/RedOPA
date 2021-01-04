'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Emociones', [
      {
        nombre: 'Feliz',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Piola',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Indeciso',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Indiferente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Enojado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Cansado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Triste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Emociones', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pueblos_indigenas', [
      {
        nombre: 'Pueblo aymara',
        descripcion: 'Pueblo aymara',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pueblo quechua',
        descripcion: 'Pueblo quechua',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pueblo atacameño',
        descripcion: 'Pueblo atacameño',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pueblo kolla',
        descripcion: 'Pueblo kolla',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pueblo diaguita',
        descripcion: 'Pueblo diaguita',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pueblo rapanui',
        descripcion: 'Pueblo rapanui',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pueblo mapuche',
        descripcion: 'Pueblo mapuche',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pueblo yagán',
        descripcion: 'Pueblo yagán',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pueblo kawésqar',
        descripcion: 'Pueblo kawésqar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pueblos_indigenas', null, {});
  }
};

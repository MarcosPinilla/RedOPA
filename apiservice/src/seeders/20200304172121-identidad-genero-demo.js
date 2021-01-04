'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Identidades_genero', [
      {
        nombre: 'Hombre',
        descripcion: 'Sexo biológico asignado al nacer es hombre e identidad de género es masculina',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Mujer',
        descripcion: 'Sexo biológico asignado al nacer es mujer e identidad de género es femenina',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'No binario',
        descripcion: 'No se identifica con ningún género o con ambos, femenino y masculino',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Trans masculino',
        descripcion: 'Transgénero de mujer a hombre',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Trans femenino',
        descripcion: 'Transgénero de mujer a hombre',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Otro',
        descripcion: 'Otro',
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
    return queryInterface.bulkDelete('Identidades_genero', null, {});
  }
};

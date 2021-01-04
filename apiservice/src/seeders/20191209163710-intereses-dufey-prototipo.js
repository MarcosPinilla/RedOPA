'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Intereses', [
      {
        nombre: 'Fútbol',
        descripcion: 'Interés relacionado a deporte',
        categoria_id: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Voleibol',
        descripcion: 'Interés relacionado a deporte',
        categoria_id: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Basquetbol',
        descripcion: 'Interés relacionado a deporte',
        categoria_id: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Series',
        descripcion: 'Interés relacionado a tiempo libre',
        categoria_id: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Literatura',
        descripcion: 'Interés relacionado a tiempo libre',
        categoria_id: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Videojuegos',
        descripcion: 'Interés relacionado a tiempo libre',
        categoria_id: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Instagram',
        descripcion: 'Interés relacionado a redes sociales',
        categoria_id: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Youtube',
        descripcion: 'Interés relacionado a redes sociales',
        categoria_id: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Dibujo',
        descripcion: 'Interés relacionado a manualidades',
        categoria_id: 21,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Música',
        descripcion: 'Interés relacionado a artes escénicas',
        categoria_id: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Danza',
        descripcion: 'Interés relacionado a artes escénicas',
        categoria_id: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Cuidado animal',
        descripcion: 'Interés relacionado a salud y medio ambiente',
        categoria_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Robótica y Tecnologías',
        descripcion: 'Interés relacionado a otros',
        categoria_id: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Intereses', null, {});
  }
};

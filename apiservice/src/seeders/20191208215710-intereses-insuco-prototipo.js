'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Intereses', [
      {
        nombre: 'Fútbol',
        descripcion: 'Interés relacionado a deporte',
        categoria_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Voleibol',
        descripcion: 'Interés relacionado a deporte',
        categoria_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Basquetbol',
        descripcion: 'Interés relacionado a deporte',
        categoria_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Series',
        descripcion: 'Interés relacionado a tiempo libre',
        categoria_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Literatura',
        descripcion: 'Interés relacionado a tiempo libre',
        categoria_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Videojuegos',
        descripcion: 'Interés relacionado a tiempo libre',
        categoria_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Instagram',
        descripcion: 'Interés relacionado a redes sociales',
        categoria_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Youtube',
        descripcion: 'Interés relacionado a redes sociales',
        categoria_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Dibujo',
        descripcion: 'Interés relacionado a manualidades',
        categoria_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Música',
        descripcion: 'Interés relacionado a artes escénicas',
        categoria_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Danza',
        descripcion: 'Interés relacionado a artes escénicas',
        categoria_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Cuidado animal',
        descripcion: 'Interés relacionado a salud y medio ambiente',
        categoria_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Robótica y Tecnologías',
        descripcion: 'Interés relacionado a otros',
        categoria_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Intereses', null, {});
  }
};

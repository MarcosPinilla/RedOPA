'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categorias_intereses', [
      {
        nombre: 'Deporte',
        descripcion: 'Categoría de deportes',
        institucion_id: 1,
        icono_url: '/imagenes/categorias/deportes.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Música',
        descripcion: 'Categoría de música',
        institucion_id: 1,
        icono_url: '/imagenes/categorias/artes_escenicas.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Religión',
        descripcion: 'Categoría de religión',
        institucion_id: 1,
        icono_url: '/imagenes/categorias/otro.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categorias_intereses', null, {});
  }
};

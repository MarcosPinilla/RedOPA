'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categorias_intereses', [
      {
        nombre: 'Deportes',
        descripcion: 'Categoría de deportes',
        institucion_id: 5,
        icono_url: '/imagenes/categorias/deportes.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Tiempo Libre',
        descripcion: 'Categoría de tiempo',
        institucion_id: 5,
        icono_url: '/imagenes/categorias/tiempo_libre.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Redes Sociales',
        descripcion: 'Categoría de redes',
        institucion_id: 5,
        icono_url: '/imagenes/categorias/redes_sociales.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Manualidades',
        descripcion: 'Categoría de manualidades',
        institucion_id: 5,
        icono_url: '/imagenes/categorias/manualidades.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Artes Escénicas',
        descripcion: 'Categoría de artes',
        institucion_id: 5,
        icono_url: '/imagenes/categorias/artes_escenicas.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Salud y Medio Ambiente',
        descripcion: 'Categoría de salud',
        institucion_id: 5,
        icono_url: '/imagenes/categorias/medio_ambiente.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Otros',
        descripcion: 'Categoría otros',
        institucion_id: 5,
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

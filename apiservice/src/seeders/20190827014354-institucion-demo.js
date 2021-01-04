'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Instituciones', [
      {
        nombre: 'Centro OPA',
        rut: '879129001',
        direccion: 'Av. Francisco Salazar 01145, Temuco',
        telefono: '74839201',
        foto_url: '/imagenes/school_default.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Liceo Camilo Henriquez',
        rut: '879129001',
        direccion: 'Andes, Temuco',
        telefono: '74839201',
        foto_url: '/imagenes/school_default.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Instituto Superior de Comercio Tiburcio Saavedra Alarcón Temuco',
        rut: '000000',
        direccion: 'Av. Arturo Prat 0105, Temuco',
        telefono: '+56 45 221 0947',
        foto_url: '/imagenes/school_default.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Liceo Gabriela Mistral Temuco',
        rut: '000001',
        direccion: 'Antonio Varas 630, Temuco',
        telefono: '+56 45 221 0647',
        foto_url: '/imagenes/school_default.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Escuela Artística Municipal Armando Dufey Blanc',
        rut: '000002',
        direccion: 'Av. Olimpia 01355, Esquina Av. Pablo Neruda',
        telefono: '+56 45 221 0830',
        foto_url: '/imagenes/school_default.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Instituciones', null, {});
  }
};

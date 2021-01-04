'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        email: 'j.pailahueque02@ufromail.cl',
        password: bcrypt.hashSync('123456', 10),
        nombres: 'Jorge Diego',
        apellidos: 'Pailahueque Colicheo',
        telefono: '0000000',
        rut: '14141414',
        nacimiento: new Date(),
        estado: 1,
        foto_url: '/imagenes/opa_icon.png',
        institucion_id: 6,
        permiso_id: 3,
        genero_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'opa.desarrollo@gmail.com',
        password: bcrypt.hashSync('CENTROOPA2020', 10),
        nombres: 'SuperAdmin OPA',
        apellidos: 'Centro',
        telefono: '0000000',
        rut: '793489131',
        nacimiento: new Date(),
        estado: 1,
        foto_url: '/imagenes/opa_icon.png',
        institucion_id: 6,
        permiso_id: 3,
        genero_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};

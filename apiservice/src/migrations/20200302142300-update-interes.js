'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Intereses', 'icono_url', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '/imagenes/interes.png',
    });
  },
  down: (queryInterface, Sequelize) => {
    //
  },
};
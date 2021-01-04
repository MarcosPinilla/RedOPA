'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Instituciones', 'umbral_riesgo', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 8,
    });
  },
  down: (queryInterface, Sequelize) => {
    //
  },
};
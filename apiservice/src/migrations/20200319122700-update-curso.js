'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Cursos', 'etapa', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2,
    });
  },
  down: (queryInterface, Sequelize) => {
    //
  },
};
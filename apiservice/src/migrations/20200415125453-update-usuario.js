'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Usuarios', 'consentimiento', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    //
  },
};
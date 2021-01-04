'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Cursos', 'institucion_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Instituciones',
        key: 'id',
      },
      allowNull: false,
      defaultValue: 1,
    });
  },
  down: (queryInterface, Sequelize) => {
    //
  },
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.addColumn('Alumnos', 'pueblo_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Pueblos_indigenas',
            key: 'id',
          },
          allowNull: true,
        }),
        queryInterface.addColumn('Alumnos', 'genero_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Identidades_genero',
            key: 'id',
          },
          allowNull: true,
        }),
        queryInterface.addColumn('Alumnos', 'orientacion_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Orientaciones_sexuales',
            key: 'id',
          },
          allowNull: true,
        }),
      ]
    );
  },
  down: (queryInterface, Sequelize) => {
    //
  },
};
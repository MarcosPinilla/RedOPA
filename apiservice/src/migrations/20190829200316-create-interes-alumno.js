'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Intereses_alumnos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alumno_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumnos',
          key: 'id',
        },
        allowNull: false,
      },
      interes_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Intereses',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Intereses_alumnos');
  }
};
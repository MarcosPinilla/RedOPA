'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Apoderados_alumnos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parentesco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      apoderado_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Apoderados',
          key: 'id',
        },
        allowNull: false,
      },
      alumno_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumnos',
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
    return queryInterface.dropTable('Apoderados_alumnos');
  }
};
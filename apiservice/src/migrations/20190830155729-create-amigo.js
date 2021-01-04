'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Amigos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      alumno_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumnos',
          key: 'id',
        },
        allowNull: false,
      },
      amigo_id: {
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
    return queryInterface.dropTable('Amigos');
  }
};
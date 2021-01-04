'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alertas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      mensaje: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tipo: {
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
      receptor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
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
    return queryInterface.dropTable('Alertas');
  }
};
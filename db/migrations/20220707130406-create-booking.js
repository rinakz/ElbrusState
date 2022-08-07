'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Types',
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      day_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Days',
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      time_start: {
        type: Sequelize.STRING,
      },
      time_end: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};

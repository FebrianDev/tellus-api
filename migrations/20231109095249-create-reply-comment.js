'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReplyComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_post: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      prev_message: {
        type: Sequelize.STRING
      },
      id_reply: {
        type: Sequelize.INTEGER
      },
      is_root: {
        type: Sequelize.BOOLEAN
      },
      token: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReplyComments');
  }
};
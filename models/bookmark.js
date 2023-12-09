'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Bookmark.belongsTo(models.Post, { foreignKey: 'id_user' });
      Bookmark.belongsTo(models.Post, { foreignKey: 'id_post' });
    }
  }
  Bookmark.init({
    id_user: DataTypes.STRING,
    id_post: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};
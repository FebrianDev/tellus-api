'use strict';
const {
  Model
} = require('sequelize');

const {Like} = require('../models')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     // Post.belongsTo(models.Like, { foreignKey: 'id_user' });
      Post.hasMany(models.Like, { foreignKey: 'id_user' });
      Post.hasMany(models.Like, { foreignKey: 'id_post' });

      Post.hasMany(models.Bookmark, { foreignKey: 'id_user' });
      Post.hasMany(models.Bookmark, { foreignKey: 'id_post' });
    }
  }

  Post.init({
    id_user: DataTypes.STRING,
    message: DataTypes.STRING,
    like: DataTypes.INTEGER,
    comment: DataTypes.INTEGER,
    tag:DataTypes.STRING,
    is_private: DataTypes.BOOLEAN,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });


  return Post;
};
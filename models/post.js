'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    id_user: DataTypes.INTEGER,
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
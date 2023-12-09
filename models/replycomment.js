'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReplyComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ReplyComment.belongsTo(models.Comment, { foreignKey: 'id_reply' });
        }
    }

    ReplyComment.init({
        id_post: DataTypes.INTEGER,
        id_user: DataTypes.STRING,
        message: DataTypes.STRING,
        prev_message: DataTypes.STRING,
        id_reply: DataTypes.INTEGER,
        is_root: DataTypes.BOOLEAN,
        token: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ReplyComment',
    });
    return ReplyComment;
};
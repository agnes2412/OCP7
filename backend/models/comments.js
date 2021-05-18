'use strict'

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.STRING(255), },
    statut: { type: DataTypes.INTEGER(1), },
  },
    {});
    Comment.associate = function(models) {
      models.Comment.hasMany(models.User, {
        foreignKey: { alloNull: false }
      }),
      models.Comment.hasMany(models.Post, {
        foreignKey: { alloNull: false }
      });
    };
    return Comment;
}



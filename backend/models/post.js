'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING(255), },
    content: { type: DataTypes.STRING(255), },
    statut: { type: DataTypes.INTEGER(1), },
  },
    {});
    Post.associate = function(models) {
      models.Post.hasMany(models.User, {
        foreignKey: { alloNull: false }
      });
    };
    return Post;
}
'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING(255), },
    content: { type: DataTypes.STRING(255), },
    statut: { type: DataTypes.INTEGER(1), },
  },
    {});
    Post.associate = function(models) {
      //models.Post va fournir une clé étrangère à models.comment
      models.Post.hasMany(models.Comment),
      //models.Post va recevoir une clé étrangère de models.User
      models.Post.belongsTo(models.User, {
        onDelete: 'cascade',
        foreignKey: { alloNull: false }
      });
    };
    return Post;
}
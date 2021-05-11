'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    title: { type: DataTypes.STRING(255), },
    content: { type: DataTypes.STRING(255), },
  },
    {});
    //User.associate = function(models) {
      //models.Comment.hasMany(models.Comment)
    //};
    return Post;
}
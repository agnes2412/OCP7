'use strict'

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    content: { type: DataTypes.STRING(255), },
  },
    {});
    //User.associate = function(models) {
      //models.User.hasMany(models.Post)
    //};
    return Comment;
}



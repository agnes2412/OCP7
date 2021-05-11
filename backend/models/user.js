'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: { type: DataTypes.STRING(255), allowNull: false, },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true, },
    password: { type: DataTypes.STRING(255), allowNull: false, }
  },
    {});
    //User.associate = function(models) {
      //models.User.hasMany(models.Post)
    //};
    return User;
}



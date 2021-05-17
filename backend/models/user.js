'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: { type: DataTypes.STRING(255), allowNull: false, },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true, },
    password: { type: DataTypes.STRING(255), allowNull: false, }
  },
    {});
  //users.associate = function (models) {
    //models.users.hasMany(models.Post)
  //};
  return User;
}



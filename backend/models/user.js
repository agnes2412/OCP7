'use strict'
//Appel de sequelize
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING(255), allowNull: false, },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true, },
    password: { type: DataTypes.STRING(255), allowNull: false, },
    statut: { type: DataTypes.INTEGER(1), },
  },
    {});
  User.associate = function(models) {
    //models.User va fournir une clé étrangère à models.Post et à models.Comment
    models.User.hasMany(models.Post),
      models.User.hasMany(models.Comment)
  };
  return User;
}



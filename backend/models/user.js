// création d'un modele user
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
host: 'localhost',
dialect: 'mysql',
logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});

const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    firstName: {type: Sequelize.STRING(255), allowNull: false, },
    lastName: {type: Sequelize.STRING(255), allowNull: false, },
    imageUrl: {type: Sequelize.STRING(255), allowNull: false, },
    email: {type: Sequelize.STRING(255), allowNull: false, unique: true, },
    password: {type: Sequelize.STRING(255), allowNull: false, }
},
        {tableName: 'user', timestamps: false, underscored: true}
);

exports.User = User;

//on exporte pour utiliser notre connexion depuis les autre fichiers.
exports = module.exports = {};
exports.sequelize = sequelize;

/*const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true*/
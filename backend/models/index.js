//Utilisation du langage attendu (sequelize)
"use strict";

//
const fs = require('fs');
const path = require('path');
const baseName = path.basename(__filename);
//Const db contient la connexion 
const db = {};
const Sequelize = require('sequelize');

let sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//Donne l'information sur la connexion
sequelize.authenticate().then(() => console.log('La connexion est établie !'))
    .catch((error) => console.log('La connexion a échouée !', error));

//Permet la lecture des fichiers
fs.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf(".") !== 0) && (file !== baseName) && (file.slice(-3) === '.js')
})
//Permet l'identification des model suite à la lecture de l'index
.forEach(file => {
    const model = require(path.join(__dirname, file)) (sequelize, Sequelize.DataTypes);
    //Chacun des fichiers présent dans model sera stocké dans la variable db
    db[model.name] = model;
})

//chaque objet de db(les différents modèles name qui y sont stockés)
Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db)
    }
})

//Dans le db, je stocke le sequelize(connexion), le Sequelize (module) + les différents model
//Permet d'exploiter les différents model (users, comments, posts)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

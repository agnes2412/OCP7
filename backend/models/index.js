"use strict";

const fs = require('fs');
const path = require('path');
const baseName = path.basename(__filename);
const db = {};
const Sequelize = require('sequelize');

let sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => console.log('La connexion est établie !'))
    .catch((error) => console.log('La connexion a échouée !', error));

fs.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf(".") !== 0) && (file !== baseName) && (file.slice(-3) === '.js')
})
.forEach(file => {
    const model = require(path.join(__dirname, file)) (sequelize, Sequelize.DataTypes);
    db[model.name] = model;
})

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

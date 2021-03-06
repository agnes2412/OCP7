const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//J'importe mon modèle user pour lire et enregistrer des users dans les middleware suivants
//const User = require('../models/user');
const passwordValidator = require('password-validator');
//Je crée un schéma pour recevoir des mots de passe sécurisés
const schema = new passwordValidator();
const db = require('../models');
//const user = require('../models/user');
require('dotenv').config();

//La fonction 'signup' pour l'enregistrement de nouveaux utilisateurs depuis l'appli frontend
exports.signup = (req, res, next) => {
    //Si les données entrées ne correspondent pas au schéma, envoi d'une erreur
    if (!schema.validate(req.body.password)) {
        res.status(401).json({ error: 'Les données entrées ne correspondent pas au schéma demandé !' });
        //Sinon si les données entrées correspondent au schéma
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log(req.body.email);
            db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                statut: 0
            }
            )
                //Renvoi d'un 201 pour une création de ressource et un message
                .then(() => res.status(201).json({
                    message: 'Utilisateur crée !'
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

schema
    .is().min(8)                            //minimum 8 caractères
    .is().max(50)                           //maximum 50 caractères
    .has().uppercase(1)                     //minimum 1 caractère majuscule
    .has().lowercase(1)                     //minimum 1 caractère minuscule
    .has().digits(2)                        //minimum 2 chiffres
    .has().not().spaces()                   //aucun espace
    .is().not().oneOf(['Azerty123']);       //Liste noire de ces valeurs

//La fonction login pour la connexion des utilisateurs existants
exports.login = (req, res, next) => {
    //Je mets l'objet de comparaison, ici l'utilisateur pour qui le nom et l'adresse mail correspondent à ceux envoyés dans la requête
    db.User.findOne({
        where: {
            email: req.body.email
        },
    })
        //Je vérifie si la promise a récupérer un user
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //J'utilise bcrypt pour comparer le mot de passe de l'utilisateur qui essaie de se connecter au hash de la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si la comparaison des mdp n'est pas valable
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        //Renvoi d'un objet json qui contient l'identifiant du user dans la base
                        userId: user.id,
                        userStatut: user.statut,
                        //Renvoi d'un token, appel de la fonction 'sign' de jwt qui prend comme arguments les données que je veux encoder
                        token: jwt.sign(
                            //1er argument : L'objet userId sera l'identifiant user de l'utilisateur ou de l'admin
                            { userId: user.id, userStatut: user.statut },
                            //2ème argument: clé secrète pour l'encodage
                            `${process.env.JWT_SECRETE_KEY}`,
                            //3ème argument de configuration avec expiration du token à 24h
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteAccountUser = (req, res, next) => {
    db.User.destroy({
        where: { id: req.params.id },
    })
        .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteAccountUserByAdmin = (req, res, next) => {
    db.User.destroy({
        //Je récupère l'objet de l'id passé dans l'url du DELETE
        where: { id: req.params.id },
    })
        .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyStatutUser = (req, res, next) => {
    db.User.update({
        statut: req.body.statut
    },
        {
            where: {
                //Je récupère l'objet de l'id passé dans l'url du PUT
                id: req.params.id,
            }
        })
        .then(() => res.status(200).json({ message: 'Statut modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    //console.log(req.params.id)
    db.User.findOne({
        where: {
            id: req.params.id,
        },
        //include: [{
           // model: db.User,
            //attributes: ["statut"]
        //}]
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    db.User.findAll({
    })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};
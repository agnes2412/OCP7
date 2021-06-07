const fs = require('fs');
const db = require('../models');

exports.createPost = (req, res, next) => {
    db.Post.create({
        //Je renseigne la clé étrangère(id de l'utilisateur)pour le champ UserId de la table post
        UserId: req.user.id,
        title: req.body.title,
        content: req.body.content,
        statut: 0,
    })
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    db.Post.save({
        where: {
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            statut: 0
        }
    })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    db.Post.destroy({
        where: { id: req.params.id },
    })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        where: {
            id: req.params.id,
            statut: 0
        },
        include: [{
            model: db.User,
            attributes: ["name"],
            //model: db.Comment,
            //attributes: ["content"]
        }]
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        where: {
            statut: 0
        },
        include: [{
            model: db.User,
            attributes: ["name"]
        }], order: [["createdAt", "DESC"]]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
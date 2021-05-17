const fs = require('fs');
const db = require('../models/index');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    //l'id renvoyé par le frontend n'est pas le bon donc j'enlève le champ id du corps de la requête
    delete postObject.id;
    db.Post.create({
        where: {
            title: req.body.title,
            content: req.body.content,
        }
    })
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    db.Post.updateOne({
        where: { id: req.params.id }
    })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    db.Post.findOne({
        where: { id: req.params.id },
    })      
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));    
};

exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        where: { id: req.params.id }
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
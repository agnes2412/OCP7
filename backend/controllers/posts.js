const fs = require('fs');
const db = require('../models');

exports.createPost = (req, res, next) => {
    db.Post.create({
            title: req.body.title,
            content: req.body.content,
            statut: 0,
            UserId: 19
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
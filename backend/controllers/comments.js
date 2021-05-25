//const Comment = require('../models/comments');
const db = require('../models');

exports.createComment = (req, res, next) => {
    db.Comment.create({
        content: req.body.content,
        statut: 0,
        //UserId: req.body.UserId,
    })
        //Même si la requête aboutit, je renvoie une réponse au frontend sinon expiration de la requête
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
        //Je récupère l'erreur et renvoie un code 400 avec un json error
        .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    db.Comment.updateOne({
        where: { id: req.params.id }
    })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    db.Comment.destroy({
        where: { id: req.params.id }
    })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    db.Comment.findOne({
        where: { id: req.params.id }
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    //La méthode find permet de récupérer tous les comments
    db.Comment.findAll()
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};
//const Comment = require('../models/comments');
const db = require('../models');

exports.createComment = (req, res, next) => {
    db.Comment.create({
        //Je renseigne la clé étrangère(id de l'utilisateur et du post) pour le champ UserId et PostId de la table comment
        //UserId: req.body.UserId,
        //PostId: req.body.PostId,
        //content: req.body.content,
        //Je renseigne la clé étrangère(id de l'utilisateur et du post) pour le champ UserId et PostId de la table comment
        UserId: req.body.user_id,
        PostId: req.body.post_id,
        content: req.body.content,
        statut: 0
    })
        //Même si la requête aboutit, je renvoie une réponse au frontend sinon expiration de la requête
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
        //Je récupère l'erreur et renvoie un code 400 avec un json error
        .catch(error => res.status(400).json({ error }));
};

//exports.modifyComment = (req, res, next) => {
    //db.Comment.update({
        //where: {
            //id: req.params.id,
            //content: req.body.content,
            //statut: 0
        //}
    //})
        //.then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
        //.catch(error => res.status(400).json({ error }));
//};

exports.deleteComment = (req, res, next) => {
    db.Comment.destroy({
        where: { id: req.params.id }
    })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    db.Comment.findOne({
        where: {
            id: req.params.id,
        },
        include: [{
            model: db.User,
            attributes: ["name"]
        }],
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        where: {
            //Permet de récupérer les commentaires pour chancun des posts
            PostId: req.params.id,
        },
        include: [{
            model: db.User,
            attributes: ["name"]
        }], order: [["createdAt", "DESC"]]
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};
const fs = require('fs');
const db = require('../models');

exports.createPost = (req, res, next) => {
    console.log(req.body.user)
    db.Post.create({
        //Je renseigne la clé étrangère (id de l'utilisateur) pour le champ UserId de la table post
        UserId: req.body.user_id,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //Je récupère les données des champs titre et contenu
        title: req.body.title,
        content: req.body.content,
        statut: 0,
    })
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    db.Post.update({
        UserId: req.body.user,
        post: req.body.post
    }, {
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
    //console.log(req.body);
    console.log("id :" + req.params.id);
    db.Post.findOne({ _id: req.params.id })
        .then(post => {
            //Je récupère le nom du fichier de l'image et le split
            //Le split retourne un tableau de 2 éléments ce qui vient avant le /images/ 
            //et ce qui vient après le /images/ donc le nom du fichier
            filename = post.image.split('/images/')[1];
            //Avec ce nom, j'appelle la fonction unlink(supprimer un fichier)
            //1er argument = string qui correspond au chemin du fichier
            //2ème argument = le callback: ce qu'il faut faire une fois le fichier supprimé; càd supprimer le 'sauce' de la base de données
            fs.unlink(`images/${filename}`, () => {
    db.Post.destroy(
        {
            where: {
                id: req.params.id,
            },
        })
})
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));
   })
    .catch(error => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    console.log(req.params);
    db.Post.findOne({
        where: {
            id: req.params.id,
            //statut: 0,
        },
        include: [{
            model: db.User,
            attributes: ["name"],
        }]
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    //console.log(req.body);
    //console.log(req.params.id);
    db.Post.findAll({
        //where: {
            //statut: 1
        //},
        include: [{
            model: db.User,
            attributes: ["name"],
        }], order: [["createdAt", "DESC"]]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
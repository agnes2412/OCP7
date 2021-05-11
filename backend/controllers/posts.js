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
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    })
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    console.log(req.body);
    //Si il y a déjà un fichier image dans la requête
    if (req.file) {
        db.Post.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(resPost => {
                const filename = resPost.imageUrl.split('/images/')[1];
                //Je le supprime
                fs.unlink(`images/${filename}`, (error => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('image supprimée: ' + filename);
                    }
                }));
            })
    }
    const postObject = req.file ?
        //S'il existe, je récupère la chaine de caractère, je la parse en objet et je génère la nouvelle image 
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            //sinon je prends le corps de la requête
        } : { ...req.body };
    //1er argument l'id qui correspond à l'id envoyé dans les paramètres de recherche, 
    //2ème argument le nouveau post(...pour récupérer le post dans le corps de la requête; id correspond à celui des paramètres )
    db.Post.updateOne({
        where: { id: req.params.id, ...postObject, id: req.params.id }
    })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    //Avant de supprimer l'objet de la base, je vais le chercher pour récupérer l'url de l'image, 
    db.Post.findOne({
        where: { id: req.params.id },
    })
        .then(post => {
            filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                db.Post.destroy({
                    where: { id: req.params.id }
                })
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
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
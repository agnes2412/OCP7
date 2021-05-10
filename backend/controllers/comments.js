const Comment = require('../models/comments');

const fs = require('fs');

exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    //l'id renvoyé par le frontend n'est pas le bon donc j'enlève le champ id du corps de la requête
    delete commentObject._id;
    //Je crée un nouvelle instance de mon modèle
    const comment = new Comment({
        //L'opérateur 'spread' va copier les champs dans le corps de la requête
        ...commentObject,
        //Je renseigne le frontend sur l'url de l'image, c'est multer qui a généré ce fichier
        //Je génère l'url de l'image: le protocole, le nom d'hôte, /images/ et le nom du fichier
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //likes: 0,
        //usersLiked: [],
    });
    //Avec la méthode .save, j'enregistre l'objet dans la base de données et retourne une promesse
    comment.save()
        //Même si la requête aboutit, je renvoie une réponse au frontend sinon expiration de la requête
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        //Je récupère l'erreur et renvoie un code 400 avec un json error
        .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    console.log(req.body);
    //Si il y a déjà un fichier image dans la requête
    if (req.file) {
        Comment.findOne({ _id: req.params.id })
            .then(resComment => {
                //Je récupère le nom du fichier existant et le split
                //Le split retourne un tableau de 2 éléments ce qui vient avant le /images/ 
                //et ce qui vient après le /images/ donc le nom du fichier
                const filename = resComment.imageUrl.split('/images/')[1];
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

    const commentObject = req.file ?
        //S'il existe, je récupère la chaine de caractère, je la parse en objet et je génère la nouvelle image 
        {
            ...JSON.parse(req.body.comment),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            //sinon je prends le corps de la requête
        } : { ...req.body };
    //1er argument l'id qui correspond à l'id envoyé dans les paramètres de recherche, 
    //2ème argument le nouveau commentaire(...pour récupérer le commentaire dans le corps de la requête; id correspond à celui des paramètres )
    Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    //Avant de supprimer l'objet de la base, je vais le chercher pour récupérer l'url de l'image, 
    //je récupère le nom du fichier pour le supprimer
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
            //Je récupère le nom du fichier de l'image et le split
            //Le split retourne un tableau de 2 éléments ce qui vient avant le /images/ 
            //et ce qui vient après le /images/ donc le nom du fichier
            filename = comment.imageUrl.split('/images/')[1];
            //Avec ce nom, j'appelle la fonction unlink(supprimer un fichier)
            //1er argument = string qui correspond au chemin du fichier
            //2ème argument = le callback: ce qu'il faut faire une fois le fichier supprimé; càd supprimer le 'commentaire' de la base de données
            fs.unlink(`images/${filename}`, () => {
                comment.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    //findOne permet de récupérer un comment
    Comment.findOne({ _id: req.params.id })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    //La méthode find permet de récupérer tous les comments
    Comment.find()
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};
const Comment = require('../models/comment');

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
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        //Je récupère l'erreur et renvoie un code 400 avec un json error
        .catch(error => res.status(400).json({ error }));
};
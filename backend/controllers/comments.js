//const Comment = require('../models/comments');
const db = require('../models/index');

exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    //l'id renvoyé par le frontend n'est pas le bon donc j'enlève le champ id du corps de la requête
    delete commentObject._id;
    //Je crée un nouvelle instance de mon modèle
    db.Comment.create({
        where: { content: req.body.content }
    })
        //Même si la requête aboutit, je renvoie une réponse au frontend sinon expiration de la requête
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        //Je récupère l'erreur et renvoie un code 400 avec un json error
        .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    console.log(req.body);
    const commentObject = req.file ?
        //S'il existe, je récupère la chaine de caractère, je la parse en objet et je génère la nouvelle image 
        {
            ...JSON.parse(req.body.comment),
            //sinon je prends le corps de la requête
        } : { ...req.body };
    //1er argument l'id qui correspond à l'id envoyé dans les paramètres de recherche, 
    //2ème argument le nouveau commentaire(...pour récupérer le commentaire dans le corps de la requête; id correspond à celui des paramètres )
    db.Comment.updateOne({ 
        where: { id: req.params.id ,  ...commentObject, id: req.params.id }
         })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
                db.Comment.deleteOne({ 
                    where: {id: req.params.id }
                })
                    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    //La méthode find permet de récupérer tous les comments
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
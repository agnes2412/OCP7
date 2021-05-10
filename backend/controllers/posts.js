const Post = require('../models/post');

const fs = require('fs');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    //l'id renvoyé par le frontend n'est pas le bon donc j'enlève le champ id du corps de la requête
    delete postObject._id;
    //Je crée un nouvelle instance de mon modèle
    const post = new Post({
        //L'opérateur 'spread' va copier les champs dans le corps de la requête
        ...postObject,
        //Je renseigne le frontend sur l'url de l'image, c'est multer qui a généré ce fichier
        //Je génère l'url de l'image: le protocole, le nom d'hôte, /images/ et le nom du fichier
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //likes: 0,
        //usersLiked: [],
    });
    //Avec la méthode .save, j'enregistre l'objet dans la base de données et retourne une promesse
    post.save()
        //Même si la requête aboutit, je renvoie une réponse au frontend sinon expiration de la requête
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        //Je récupère l'erreur et renvoie un code 400 avec un json error
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    console.log(req.body);
    //Si il y a déjà un fichier image dans la requête
    if (req.file) {
        Post.findOne({ _id: req.params.id })
            .then(resPost => {
                //Je récupère le nom du fichier existant et le split
                //Le split retourne un tableau de 2 éléments ce qui vient avant le /images/ 
                //et ce qui vient après le /images/ donc le nom du fichier
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
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    //Avant de supprimer l'objet de la base, je vais le chercher pour récupérer l'url de l'image, 
    //je récupère le nom du fichier pour le supprimer
    Post.findOne({ _id: req.params.id })
        .then(post => {
            //Je récupère le nom du fichier de l'image et le split
            //Le split retourne un tableau de 2 éléments ce qui vient avant le /images/ 
            //et ce qui vient après le /images/ donc le nom du fichier
            filename = post.imageUrl.split('/images/')[1];
            //Avec ce nom, j'appelle la fonction unlink(supprimer un fichier)
            //1er argument = string qui correspond au chemin du fichier
            //2ème argument = le callback: ce qu'il faut faire une fois le fichier supprimé; càd supprimer le 'post' de la base de données
            fs.unlink(`images/${filename}`, () => {
                post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    //findOne permet de récupérer un post
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    //La méthode find permet de récupérer tous les posts
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
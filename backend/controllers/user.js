//Ce controleur comporte deux middleware d'authentification
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//J'importe mon modèle user pour lire et enregistrer des users dans les middleware suivants
const User = require('../models/user');
const passwordValidator = require('password-validator');
//Je crée un schéma pour recevoir des mots de passe sécurisés
const schema = new passwordValidator();
require('dotenv').config();

//La fonction 'signup' pour l'enregistrement de nouveaux utilisateurs depuis l'appli frontend
exports.signup = (req, res, next) => {
    //Si les données entrées ne correspondent pas au schéma, envoi d'une erreur
    if (!schema.validate(req.body.password)) {
        res.status(401).json({ error: 'Les données entrées ne correspondent pas au schéma demandé !' });
        //Sinon si les données entrées correspondent au schéma
    } else if (schema.validate(req.body.password)) {
        //Hashage du mot de passe du user avec bcrypt et je l'enregistre dans la base de données
        //Avec la fonction bcrypt.hash, je hash, crypte le mot de passe; je lui passe le mdp du corps de la requête passé par le frontend
        //10 correspond au salt, càd combien de fois on exécute l'algorythme de hashage, ici 10 tours(c'est une méthode asynchrone, càd qui prend du temps, 10 tours sufffisent)
        bcrypt.hash(req.body.password, 10)
            //Je récupère le hash de mot de passe
            .then(hash => {
                //Je l'enregistre dans un nouveau user. Donc je crée un nouvel user avec mon modèle mongoose
                const user = new User({
                    //Je passe l'adresse (cryptée) qui est fourni dans le corps de la requête
                    email: req.body.email,
                    //Comme mot de passe, j'enregistre le hash, donc le mot de passe crypté
                    password: hash
                });
                console.log(hash);
                //J'utilise la méthode save pour l'enregistrer dans la base de données
                user.save()
                    //Renvoi d'un 201 pour une création de ressource et un message
                    .then(() => res.status(201).json({ message: 'Utisateur crée !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }
};

schema
    .is().min(8)                            //minimum 8 caractères
    .is().max(50)                           //maximum 50 caractères
    .has().uppercase(1)                     //minimum 1 caractère majuscule
    .has().lowercase(1)                     //minimum 1 caractère minuscule
    .has().digits(2)                        //minimum 2 chiffres
    .has().not().spaces()                   //aucun espace
    .is().not().oneOf(['Azerty123']);       //Liste noire de ces valeurs

//La fonction login pour la connexion des utilisateurs existants
exports.login = (req, res, next) => {
    //Je mets l'objet de comparaison, ici l'utilisateur pour qui l'adresse mail correspond à l'adresse mail envoyée dans la requête
    User.findOne({ email: req.body.email })
        //Je vérifie si la promise a récupérer un user
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //J'utilise bcrypt pour comparer le mot de passe de l'utilisateur qui essaie de se connecter au hash de la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si la comparaison des mdp n'est pas valable
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    //Si elle est bonne, renvoi d'un status 200 pour une requête ok
                    res.status(200).json({
                        //Renvoi d'un objet json qui contient l'identifiant du user dans la base
                        userId: user._id,
                        //Renvoi d'un token, appel de la fonction 'sign' de jwt qui prend comme arguments les données que je veux encoder
                        token: jwt.sign(
                            //1er argument : L'objet userId sera l'identifiant user de l'utilisateur
                            { userId: user._id },
                            //2ème argument: clé secrète pour l'encodage
                            `${process.env.JWT_KEY}`,
                            //3ème argument de configuration avec expiration du token à 24h
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    console.log(req.body);
    //Si il y a déjà un fichier image dans la requête
    if (req.file) {
        User.findOne({ _id: req.params.id })
            .then(resUser => {
                //Je récupère le nom du fichier existant et le split
                //Le split retourne un tableau de 2 éléments ce qui vient avant le /images/ 
                //et ce qui vient après le /images/ donc le nom du fichier
                const filename = resUser.imageUrl.split('/images/')[1];
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

    const userObject = req.file ?
        //S'il existe, je récupère la chaine de caractère, je la parse en objet et je génère la nouvelle image 
        {
            ...JSON.parse(req.body.user),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            //sinon je prends le corps de la requête
        } : { ...req.body };
    //1er argument l'id qui correspond à l'id envoyé dans les paramètres de recherche, 
    //2ème argument le nouveau user(...pour récupérer le user dans le corps de la requête; id correspond à celui des paramètres )
    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    //Avant de supprimer l'objet de la base, je vais le chercher pour récupérer l'url de l'image, 
    //je récupère le nom du fichier pour le supprimer
    User.findOne({ _id: req.params.id })
        .then(user => {
            //Je récupère le nom du fichier de l'image et le split
            //Le split retourne un tableau de 2 éléments ce qui vient avant le /images/ 
            //et ce qui vient après le /images/ donc le nom du fichier
            filename = user.imageUrl.split('/images/')[1];
            //Avec ce nom, j'appelle la fonction unlink(supprimer un fichier)
            //1er argument = string qui correspond au chemin du fichier
            //2ème argument = le callback: ce qu'il faut faire une fois le fichier supprimé; càd supprimer le 'user' de la base de données
            fs.unlink(`images/${filename}`, () => {
                user.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    //findOne permet de récupérer un user
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    //La méthode find permet de récupérer tous les users
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};
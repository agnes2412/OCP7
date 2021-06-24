const express = require('express');
//Transforme le corps de la requête en format JSON
const bodyParser = require('body-parser');
//Aide à sécuriser les en-tête HTTP
const helmet = require('helmet');
//Aide à gérer les chemins des fichiers
const path = require('path');

//J'importe mes routes posts, user et comment
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');

const app = express();

//Permet d'éviter que le système de sécurité CORS ne bloque les appels HTTP lorsqu'on utilise deux serveurs différents
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //Je crée un middleware qui va répondre aux requêtes faites à /images et servir le dossier static image 
  //app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(bodyParser.json());
  app.use(helmet());
  
  //Connexion avec les routes attendues par le frontend (routes racines)
  app.use('/api/posts', postsRoutes);
  app.use('/api/comment', commentRoutes);
  app.use('/api/auth', userRoutes);

  //J'exporte l'application pour y accéder depuis les autres fichiers
module.exports = app;



const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');

//J'importe mes routes posts et user
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //Je crée un middleware qui va répondre aux requêtes faites à /images et servir le dossier static image 
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(bodyParser.json());
  app.use(helmet());
  
  app.use('/api/posts', postsRoutes);
  app.use('/api/comment', commentRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;



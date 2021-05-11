
const express = require('express');
const router = express.Router();

//J'importe le middleware qui protège mes routes
const auth = require('../middleware/auth');
//J'importe le middleware qui permet de télécharger des fichiers image depuis le frontend
const multer = require('../middleware/multer-config');
//J'importe mes logiques métier (controllers) pour les intégrer à la route correspondante
const postsCtrl = require('../controllers/posts');

//Pour protéger mes routes, j'ajoute le middleware 'auth' avant le controleur
//J'ajoute le middleware multer pour avoir un fichier image avec la requête post
//J'applique la fonction 'logique métier' correspondante à la route 
router.post('/', auth, multer, postsCtrl.createPost);
router.put('/:id', auth, multer, postsCtrl.modifyPost);
router.delete('/:id', auth, postsCtrl.deletePost);
//router.post('/:id/like', auth, postsCtrl.likePost);
//Le : devant id indique à Express que ce chemin est dynamique 
router.get('/:id', auth, postsCtrl.getOnePost);
//router.get('/', auth, postsCtrl.getAllPosts);

//Je réexporte le routeur
module.exports = router;
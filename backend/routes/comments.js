//Je récupère express pour crée un routeur
const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
//J'importe mes logiques métier (controllers) pour les intégrer à la route correspondante
const commentsCtrl = require('../controllers/comments');

router.post('/',auth, multer, commentsCtrl.createComment);

//Je réexporte le routeur
module.exports = router;
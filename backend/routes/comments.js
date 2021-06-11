//Je récupère express pour crée un routeur
const express = require('express');
const router = express.Router();

//J'importe le middleware qui protège mes routes
const auth = require('../middleware/auth');
//J'importe mes logiques métier (controllers) pour les intégrer à la route correspondante
const commentsCtrl = require('../controllers/comments');


router.post('/', auth, commentsCtrl.createComment);
//router.put('/:id', auth, commentsCtrl.modifyComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);
//Le : devant id indique à Express que ce chemin est dynamique 
//router.get('/:id', auth, commentsCtrl.getOneComment);
//:id ici permet aux controller de récupérer les commentaires pour chacun des posts 
router.get('/:id', auth, commentsCtrl.getAllComments);

//Je réexporte le routeur
module.exports = router;
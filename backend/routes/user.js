//Je crée le routeur correspondant aux fonctions signup et login
//J'importe express pour créer le routeur
const express = require('express');
//Je crée le routeur avec la fonction Router d'express
const router = express.Router();
//J'importe le middleware qui permet de télécharger des fichiers image depuis le frontend
const multer = require('../middleware/multer-config');
//J'associe les fonctions aux différentes routes avec le controleur
const userCtrl = require('../controllers/user');

//Je crée deux routes post parce que le frontend doit envoyer des informations(adresse mail et mot de passe)
router.post('/signup', multer, userCtrl.signup);
router.post('/login', multer, userCtrl.login);

router.put('/:id',multer, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);
//Le : devant id indique à Express que ce chemin est dynamique 
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);

//J'exporte ce routeur pour pouvoir l'importer sur app.js
module.exports = router;
const express = require('express');
//Je crée le routeur avec la fonction Router d'express
const router = express.Router();
//J'associe les fonctions aux différentes routes avec le controleur
const userCtrl = require('../controllers/user');

//Je crée deux routes post parce que le frontend doit envoyer des informations(adresse mail et mot de passe)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.delete('/:id', userCtrl.deleteAccountUser);
//Le : devant id indique à Express que ce chemin est dynamique 
router.put('/moderate/:id', userCtrl.modifyStatutUser);
router.delete('/moderate/:id', userCtrl.deleteAccountUserByAdmin);

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);

//J'exporte ce routeur pour pouvoir l'importer sur app.js
module.exports = router;
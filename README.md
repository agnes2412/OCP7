# OCP7
Projet réalisé dans le cadre de la formation "Développeur Web" d'OpenClassrooms  
Intitulé : "Créer un réseau social d'entreprise"  
## Technologies utilisées
* Backend :  
- Projet hébergé par un serveur Node.js  
- Framework : Express  
- Base de données : MySql - ORM : Sequelize  
* Frontend :  
- Framework: Vue.js
## Pour accéder à ce projet  
#### Clonez le repository suivant : https://github.com/agnes2412/OCP7.git
#### Depuis votre terminal, entrez dans le dossier frontend et tapez npm install puis tapez :  
npm run serve
#### Entrez l'url suivante depuis votre navigateur http://localhost:8080/#
#### Créer un fichier .env et copier la ligne suivante :  
* JWT_SECRETE_KEY= mpjnvgft56)  
#### Récupérez le dump 'groupomania.sql' qui se trouve à la racine du projet, installez le sur votre système de gestion de base de données MySql et créez 3 variables d'environnement dans le fichier.env comme ci-dessous. Compléter les avec vos informations.  
* DB_HOSTNAME= ajoutez l'adresse du serveur de votre base de données
* DB_USER= ajoutez l'utilisateur de votre base de données
* DB_PASSWORD= ajoutez votre mot de passe utilisateur
#### Et enfin, depuis votre terminal, accédez au dossier backend et tapez :  
npm install puis nodemon 



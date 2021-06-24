-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 24 juin 2021 à 15:31
-- Version du serveur :  10.4.19-MariaDB
-- Version de PHP : 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `PostId` int(11) NOT NULL,
  `content` mediumtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `statut` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `UserId`, `PostId`, `content`, `createdAt`, `updatedAt`, `statut`) VALUES
(74, 14, 57, 'Je suis fan!\n', '2021-06-22 07:30:15', '2021-06-22 07:30:15', 0),
(81, 39, 85, 'J\'ai essayé, il est très bon !', '2021-06-23 14:06:38', '2021-06-23 14:06:38', 0),
(82, 39, 73, 'J\'adore Devos !', '2021-06-23 14:18:37', '2021-06-23 14:18:37', 0),
(84, 32, 85, 'Merci pour cette recette, les enfants ont adoré!', '2021-06-23 14:23:33', '2021-06-23 14:23:33', 0),
(85, 32, 73, 'Quel merveilleux humoriste il était...', '2021-06-23 14:25:13', '2021-06-23 14:25:13', 0),
(86, 32, 57, 'Incroyable! Ce sont les jeunes du lycée qui vont se régaler! \n', '2021-06-23 14:27:12', '2021-06-23 14:27:12', 0),
(88, 14, 87, 'Et bien, ce pêcheur revient de loin !', '2021-06-23 14:40:37', '2021-06-23 14:40:37', 0),
(89, 43, 87, 'Incroyable !', '2021-06-24 09:36:28', '2021-06-24 09:36:28', 0);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `title` varchar(80) NOT NULL,
  `content` longtext NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `statut` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `UserId`, `createdAt`, `title`, `content`, `updatedAt`, `statut`) VALUES
(57, 21, '2021-06-21 15:06:48', 'La Batmobile se refait une santé... dans le Pas-de-Calais', 'Les fans de Batman doivent se pincer pour y croire, mais l\'info est véridique : la célèbre voiture de l\'homme chauve-souris, telle qu\'on la voit dans le premier film que lui avait consacré Tim Burton en 1989, est actuellement en entretien dans un garage... d\'Achicourt, petite commune du Pas-de-Calais.\n\nCette réplique exacte du mythique véhicule -la seule en Europe- a ainsi atterri dans les Hauts-de-France en décembre, après une boutade lancée sur Instagram par Jimmy et Julien, les mécanos de cet établissement situé tout près d\'Arras, à un grand collectionneur de voitures de films, Franck Galiègue.\n\nCe dernier a confié son bijou aux Nordistes, dont l\'objectif est de remettre la voiture et ses 300 chevaux, qui n\'ont plus vrombi depuis une dizaine d\'années, en état de marche, raconte La Voix du nord.\n\nLeur spécialité et leur \"kiff\" : retaper les voitures de collection\nLe propriétaire ne prend pas trop de risques : les deux garagistes de FJC se sont fait une spécialité -et un gros \"kiff\"- de retaper les voitures de collection, notamment américaines.\n\nLa carrosserie du bolide de Batman, elle, sera bichonnée dans la foulée par un lycée professionnel de la région parisienne.', '2021-06-21 15:06:48', 0),
(73, 14, '2021-06-21 17:43:23', 'Sévère mais juste (texte de Raymond Devos)', 'Hier soir, je rentre chez moi... Qu\'est-ce que j\'apprends ?\nJ\'apprends que le chat avait mangé la pâtée du chien...\nAh, mon vieux ! J\'ai mis le chat dehors.\nLà-dessus, qu\'est-ce que j\'apprends ?\nJ\'apprends que le chien avait mangé la côtelette de ma femme...\nAh, mon vieux ! J\'ai mis le chien dehors.\nLà-dessus, qu\'est-ce que j\'apprends ?\nQue ma femme avait mangé mon beefsteack.\nAh, mon vieux !... J\'ai mis ma femme dehors.\nLà-dessus, qu\'est-ce que je découvre ?\nQue le lait que j\'avais bu le matin était celui du chat.\nAh, mon vieux !... J\'ai fait rentrer tout le monde...\nEt je suis sorti.\nSévère... mais juste.\n', '2021-06-21 17:43:23', 0),
(85, 22, '2021-06-23 14:05:32', 'Un petit cocktail sans alcool...', 'Recette du Bora Bora...\n0 cl de jus d\'ananas.6 cl de jus de fruits de la passion .1 cl de jus de citron.1 cl de grenadine Ingrédients PRÉPARATION 1.Versez les jus d’ananas, de fruits de la passion, de citron et la grenadine dans un shaker rempli de glace. Secouez énergiquement. Versez dans un verre en filtrant les glaçons. Servez immédiatement avec une paille.', '2021-06-23 14:05:32', 0),
(86, 39, '2021-06-23 14:16:49', 'Allez, petite phrase du jour...', 'La liberté commence où l\'ignorance finit. Victor Hugo', '2021-06-23 14:16:49', 0),
(87, 46, '2021-06-23 14:32:35', 'Incroyable!! ', '(New York) C’est une histoire à la Pinocchio, qu’on pourrait prendre pour un canular si elle n’était jugée crédible par des spécialistes des baleines : un pêcheur de homard du Massachusetts a été « avalé » vendredi brièvement par une baleine à bosse, avant d’être rejeté dans l’océan, vivant, et capable de raconter son aventure.', '2021-06-23 14:32:35', 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL,
  `statut` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `createdAt`, `updatedAt`, `name`, `email`, `password`, `statut`) VALUES
(14, '2021-06-15 12:12:30', '2021-06-24 12:29:11', 'Stan', 'stan@yahoo.fr', '$2b$10$ydaf0KrfJVGng6tEexQoguRv4ZCvmKBbviUeX5MbMo1O4xTKlD3bu', 1),
(21, '2021-06-16 11:50:39', '2021-06-24 12:22:25', 'Agnès', 'agnes@yahoo.fr', '$2b$10$DcPQ8Fm4a9E4cLjt8baUV.LXDUxrdPvwhkSKwCYZ4jCnEz3p63pb.', 1),
(22, '2021-06-16 11:56:18', '2021-06-16 11:56:18', 'Lina', 'lina@yahoo.fr', '$2b$10$Ukw7VRWdj6pK72tT/e4P/uuMeuCWcOTMVUMIrUwhNHX3oGbx40lPi', 0),
(32, '2021-06-19 14:11:58', '2021-06-20 17:40:33', 'Colette', 'colette@yahoo.fr', '$2b$10$QCnAI46JH7C0D2RACqzbSep4LEGsaaTphEFLlqEhvAJHDcLDE/wOO', 0),
(39, '2021-06-20 17:55:00', '2021-06-20 17:57:36', 'Stéphane', 'stephane@yahoo.fr', '$2b$10$oeRtHsySrxRzyXlnu8b5..96PDhpPKu6J5KI2QM2RgPukIjLfL0F2', 0),
(42, '2021-06-21 14:20:12', '2021-06-22 10:32:22', 'Hélène', 'helene@yahoo.fr', '$2b$10$UByDd0EAuwNcAmQ8cI/MsufmWELo/htyx7MZ52h6GtOmSKYk8rGGi', 1),
(43, '2021-06-21 16:52:42', '2021-06-21 16:53:41', 'Admin', 'admin@admin.fr', '$2b$10$IheUNCbIb951cSL/kDFYRuymQKZC9CeX4GMy7RFPzwwJ1DCsmxlG.', 2),
(46, '2021-06-22 15:35:50', '2021-06-24 12:21:54', 'Michel', 'michel@yahoo.fr', '$2b$10$/ZBOp1K0bpufDfu5R6u2UO5.hLOfAV7jo1iIyiPR.H0JOfH5lio4q', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comments_users1_idx` (`UserId`),
  ADD KEY `fk_comments_posts1_idx` (`PostId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_posts_users_idx` (`UserId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_posts1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comments_users1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_users` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

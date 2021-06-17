CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8mb4 ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `name` VARCHAR(80) NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `statut` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 45
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `groupomania`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`posts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `UserId` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `title` VARCHAR(80) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `statut` TINYINT(1) NOT NULL,
  `image` BLOB NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_posts_users_idx` (`UserId` ASC),
  CONSTRAINT `fk_posts_users`
    FOREIGN KEY (`UserId`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `groupomania`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`comments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `UserId` INT(11) NOT NULL,
  `PostId` INT(11) NOT NULL,
  `content` MEDIUMTEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `statut` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_users1_idx` (`UserId` ASC),
  INDEX `fk_comments_posts1_idx` (`PostId` ASC),
  CONSTRAINT `fk_comments_posts1`
    FOREIGN KEY (`PostId`)
    REFERENCES `groupomania`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`UserId`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;



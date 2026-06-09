SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;

USE `western_legends`;

-- -----------------------------------------------------
-- Table `western_legends`.`players`
-- One-to-One with users using user_id as PRIMARY KEY
-- -----------------------------------------------------
DROP TABLE IF EXISTS `western_legends`.`players`;

CREATE TABLE IF NOT EXISTS `western_legends`.`players` (
  `user_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `avatar_id` INT NOT NULL,
  `avatar_type` INT NOT NULL,


  -- game stats
  `level` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  `experience` INT UNSIGNED NOT NULL DEFAULT 0,
  `gold` INT UNSIGNED NOT NULL DEFAULT 100,
  `energy` SMALLINT UNSIGNED NOT NULL DEFAULT 500,
  `reputation` INT NOT NULL DEFAULT 0,
  `scenario` INT UNSIGNED NOT NULL DEFAULT 0,
  `vunerable` BOOLEAN NOT NULL DEFAULT TRUE,

  `status` ENUM(
    'idle',
    'sleeping',
    'mining',
    'searching',
    'riding'
  ) NOT NULL,

  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`user_id`),

  CONSTRAINT `fk_players_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `western_legends`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
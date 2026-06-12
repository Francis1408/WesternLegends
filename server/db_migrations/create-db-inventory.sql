SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;

--------------------------------------------------------
-- Inventory
--------------------------------------------------------
CREATE TABLE inventory (
  `user_id`      INT NOT NULL,
  `case_id`      INT UNSIGNED NOT NULL DEFAULT 26,  
  `horse_id`     INT UNSIGNED NOT NULL DEFAULT 27,  
  `weapon_id`    INT UNSIGNED,                      

  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_inv_player` FOREIGN KEY (`user_id`) REFERENCES `players`(`user_id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Inventory items
-- -----------------------------------------------------
CREATE TABLE inventory_items (
  `user_id`   INT NOT NULL,
  `item_id`   INT UNSIGNED NOT NULL,
  `quantity`  SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  `level`     TINYINT UNSIGNED NOT NULL DEFAULT 1,

  PRIMARY KEY (`user_id`, `item_id`),
  CONSTRAINT `fk_ii_inv`  FOREIGN KEY (`user_id`) REFERENCES `inventory`(`user_id`) ON DELETE CASCADE
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
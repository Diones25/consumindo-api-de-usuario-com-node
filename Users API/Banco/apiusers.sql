-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.24 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela apiusers.passwordtokens
CREATE TABLE IF NOT EXISTS `passwordtokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(200) NOT NULL,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `used` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_passwordtokens_users` (`user_id`),
  CONSTRAINT `FK_passwordtokens_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela apiusers.passwordtokens: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `passwordtokens` DISABLE KEYS */;
INSERT INTO `passwordtokens` (`id`, `token`, `user_id`, `used`) VALUES
	(3, '1625452061923', 3, 1);
/*!40000 ALTER TABLE `passwordtokens` ENABLE KEYS */;

-- Copiando estrutura para tabela apiusers.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '0',
  `email` varchar(150) NOT NULL DEFAULT '0',
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela apiusers.users: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
	(3, 'Diones', 'pereiradiones987@gmail.com', '$2b$10$PAwWSKwkjbUFh7fH1nxzv.DQRpNxlEymwEyFLDmwjBZ0iRlx9j/S6', 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

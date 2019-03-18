-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: egg_shop
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `content` text,
  `readSize` int(11) DEFAULT '0',
  `commentSize` int(11) DEFAULT '0',
  `tags` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,1,NULL,'2019-03-18 17:23:22','2019-03-18 17:23:55',1),(2,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:23','2019-03-18 17:23:23',1),(3,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:24','2019-03-18 17:23:24',1),(4,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:24','2019-03-18 17:23:24',1),(5,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:24','2019-03-18 17:23:24',1),(6,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:25','2019-03-18 17:23:25',1),(7,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:25','2019-03-18 17:23:25',1),(8,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:26','2019-03-18 17:23:26',1),(9,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:26','2019-03-18 17:23:26',1),(10,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:26','2019-03-18 17:23:26',1),(11,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:27','2019-03-18 17:23:27',1),(12,'哪个牌子的鞋子质量比较好','/uploads/qwerrr12s333.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-18 17:23:27','2019-03-18 17:23:27',1),(13,'哪个牌子的鞋子质量比较好','/uploads/c9cb680f3b0c3e65d5cd3087421094d3.jpg,/uploads/a2113f224b995859fb19e41d2da330b0.jpg','哪个牌子的鞋子质量比较好',0,0,NULL,'2019-03-19 00:58:11','2019-03-19 00:58:11',1);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-19  1:02:50

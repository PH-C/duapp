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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `articleNumber` varchar(255) DEFAULT NULL,
  `describe` text,
  `brand` varchar(255) DEFAULT NULL,
  `series` varchar(255) DEFAULT NULL,
  `readSize` int(11) DEFAULT '0',
  `isHot` tinyint(1) NOT NULL DEFAULT '0',
  `isRecommend` tinyint(1) NOT NULL DEFAULT '0',
  `tags` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:01','2019-03-18 17:24:01'),(2,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:01','2019-03-18 17:24:01'),(3,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:02','2019-03-18 17:24:02'),(4,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:02','2019-03-18 17:24:02'),(5,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:03','2019-03-18 17:24:03'),(6,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:03','2019-03-18 17:24:03'),(7,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:04','2019-03-18 17:24:04'),(8,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:04','2019-03-18 17:24:04'),(9,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:05','2019-03-18 17:24:05'),(10,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:05','2019-03-18 17:24:05'),(11,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:05','2019-03-18 17:24:05'),(12,'Nike球鞋','/uploads/qwerrr12s333.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-18 17:24:06','2019-03-18 17:24:06'),(13,'Nike球鞋','/uploads/c9cb680f3b0c3e65d5cd3087421094d3.jpg,/uploads/a2113f224b995859fb19e41d2da330b0.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-19 01:00:26','2019-03-19 01:00:26'),(14,'Nike球鞋','/uploads/c9cb680f3b0c3e65d5cd3087421094d3.jpg,/uploads/a2113f224b995859fb19e41d2da330b0.jpg','noash10001','Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋Nike球鞋','NIKE','series01',0,0,0,'潮流','2019-03-19 01:00:28','2019-03-19 01:00:28');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-19  1:02:51

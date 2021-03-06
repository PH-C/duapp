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
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `extname` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `extra` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
INSERT INTO `attachments` VALUES (1,'.jpg','/uploads/fc08e517a6488ca6364ae38db6f95f74.jpg','IMG_20190311_134820R.jpg',NULL,'2019-03-19 00:35:37','2019-03-19 00:35:37'),(2,'.png','/uploads/049bea8511497c03d8e44737ae3ac99b.png','049bea8511497c03d8e44737ae3ac99b',NULL,'2019-03-19 00:41:26','2019-03-19 00:41:26'),(3,'.jpg','/uploads/e470ede8a6439ba96ed353b2a10bbb9a.jpg','e470ede8a6439ba96ed353b2a10bbb9a',NULL,'2019-03-19 00:45:31','2019-03-19 00:45:31'),(4,'.jpg','/uploads/71640e00c152578afc33fd2dc6d86760.jpg','71640e00c152578afc33fd2dc6d86760',NULL,'2019-03-19 00:46:54','2019-03-19 00:46:54'),(5,'.jpg','/uploads/c550df2072d13c59502542e80966a01a.jpg','c550df2072d13c59502542e80966a01a',NULL,'2019-03-19 00:46:54','2019-03-19 00:46:54'),(6,'.jpg','/uploads/93a5de16339d64b9f3d17037a0bd5f06.jpg','93a5de16339d64b9f3d17037a0bd5f06',NULL,'2019-03-19 00:49:05','2019-03-19 00:49:05'),(7,'.jpg','/uploads/b9b3d7bd6d0b7c9284003376d20e4bb1.jpg','b9b3d7bd6d0b7c9284003376d20e4bb1',NULL,'2019-03-19 00:49:24','2019-03-19 00:49:24'),(8,'.jpg','/uploads/a2113f224b995859fb19e41d2da330b0.jpg','a2113f224b995859fb19e41d2da330b0',NULL,'2019-03-19 00:50:25','2019-03-19 00:50:25'),(9,'.jpg','/uploads/e41ce4186dbd628a3357f96253535be2.jpg','e41ce4186dbd628a3357f96253535be2',NULL,'2019-03-19 00:50:25','2019-03-19 00:50:25'),(10,'.jpg','/uploads/c9cb680f3b0c3e65d5cd3087421094d3.jpg','c9cb680f3b0c3e65d5cd3087421094d3',NULL,'2019-03-19 00:56:45','2019-03-19 00:56:45');
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-19  1:02:49

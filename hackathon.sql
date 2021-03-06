CREATE DATABASE  IF NOT EXISTS `280 hackathon` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `280 hackathon`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: 280 hackathon
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reservoir`
--

DROP TABLE IF EXISTS `reservoir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservoir` (
  `reservoirId` int(10) NOT NULL AUTO_INCREMENT,
  `reservoirName` varchar(50) NOT NULL,
  `reservoirLat` varchar(50) NOT NULL,
  `reservoirLng` varchar(50) NOT NULL,
  `reservoirCapacity` bigint(20) DEFAULT NULL,
  `reserviorState` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`reservoirId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservoir`
--

LOCK TABLES `reservoir` WRITE;
/*!40000 ALTER TABLE `reservoir` DISABLE KEYS */;
INSERT INTO `reservoir` VALUES (1,'Reservior 1','37.225592','-122.125337',119999,'CA'),(2,'Reservior 2','37.241602',' -122.119069',1043000,'CA'),(3,'Reservior 3','37.243550',' -122.142942',1300000,'CA');
/*!40000 ALTER TABLE `reservoir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waterlevel`
--

DROP TABLE IF EXISTS `waterlevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waterlevel` (
  `dataId` int(50) NOT NULL AUTO_INCREMENT,
  `reserviorId` int(10) NOT NULL,
  `timeStamp` int(255) NOT NULL,
  `waterLevel` int(100) NOT NULL,
  PRIMARY KEY (`dataId`),
  KEY `reserviorMapping` (`reserviorId`),
  CONSTRAINT `reserviorMapping` FOREIGN KEY (`reserviorId`) REFERENCES `reservoir` (`reservoirId`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waterlevel`
--

LOCK TABLES `waterlevel` WRITE;
/*!40000 ALTER TABLE `waterlevel` DISABLE KEYS */;
INSERT INTO `waterlevel` VALUES (1,1,1483272732,96798),(2,1,1485951132,96953),(3,1,1488370332,97127),(4,1,1491048732,97282),(5,1,1451650332,97339),(6,1,1454328732,97301),(7,1,1459512732,97417),(8,1,1462104732,97513),(9,1,1464783132,97629),(10,1,1467375132,97629),(11,1,1470053532,97687),(12,1,1472731932,97765),(13,1,1475323932,97958),(14,1,1478002332,98115),(15,1,1480594332,98800),(16,2,1483272732,993456),(17,2,1485951132,1043000),(18,2,1488370332,1000004),(19,2,1491048732,856372),(20,2,1451650332,984562),(21,2,1454328732,964573),(22,2,1459512732,934567),(23,2,1462104732,1034567),(24,2,1464783132,999934),(25,2,1467375132,999986),(26,2,1470053532,982345),(27,2,1472731932,999923),(28,2,1475323932,1000001),(29,2,1478002332,983456),(30,2,1480594332,999945),(31,3,1483272732,1100000),(32,3,1485951132,1000000),(33,3,1488370332,1036457),(34,3,1491048732,1034567);
/*!40000 ALTER TABLE `waterlevel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-23 15:01:18

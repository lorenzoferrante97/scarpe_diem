-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: scarpe_diem
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name_brand` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Nike'),(2,'Adidas'),(3,'Puma'),(4,'Reebok'),(5,'New Balance');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name_category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Running'),(2,'Casual'),(3,'Sportive'),(4,'Elegant'),(5,'Outdoor');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `discount` smallint NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `coupons_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (1,'NEWYEAR24',10,'2024-01-01','2024-03-01'),(2,'SPRING20',20,'2024-03-15','2024-06-01'),(3,'SUMMER15',15,'2024-06-10','2024-09-10'),(4,'AUTUMN10',10,'2024-09-15','2024-12-01'),(5,'WINTER25',25,'2024-12-15','2025-02-28'),(6,'PRIMAVERA25',25,'2025-04-04','2025-06-04');
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_date` date NOT NULL,
  `coupon_id` int unsigned DEFAULT NULL,
  `address_shipping` varchar(255) NOT NULL,
  `address_payment` varchar(255) DEFAULT NULL,
  `phone_number` varchar(10) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `coupon_id` (`coupon_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2024-01-20',1,'Via Roma 10, Milano','Via Roma 10, Milano','3391234567','mario.rossi@example.com',116.99,'Mario','Rossi'),(2,'2024-02-15',2,'Viale Europa 50, Torino','Viale Europa 50, Torino','3498765432','anna.bianchi@example.com',119.99,'Anna','Bianchi'),(3,'2024-03-22',NULL,'Piazza Garibaldi 20, Napoli','Piazza Garibaldi 20, Napoli','3285556677','luca.verdi@example.com',149.99,'Luca','Verdi'),(4,'2024-05-10',3,'Corso Italia 99, Firenze','Corso Italia 99, Firenze','3319988776','giulia.neri@example.com',93.99,'Giulia','Neri'),(5,'2024-07-05',NULL,'Via Dante 22, Roma','Via Dante 22, Roma','3204433221','federico.gallo@example.com',109.99,'Federico','Gallo'),(7,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','giuliopanza2000@gmail.com',129.99,'Mario','Rossi'),(8,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','giuliopanza2000@gmail.com',129.99,'Mario','Rossi'),(9,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','giuliopanza2000@gmail.com',129.99,'Mario','Rossi'),(10,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','giuliopanza2000@gmail.com',129.99,'Mario','Rossi'),(11,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','giuliopanza2000@gmail.com',129.99,'Mario','Rossi'),(12,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',129.99,'Mario','Rossi'),(13,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',129.99,'Mario','Rossi'),(14,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',129.99,'Mario','Rossi'),(15,'2025-04-07',NULL,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',129.99,'Mario','Rossi'),(16,'2025-04-07',6,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',97.49,'Mario','Rossi'),(18,'2025-04-07',6,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',97.49,'Mario','Rossi'),(19,'2025-04-07',6,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',97.49,'Mario','Rossi'),(20,'2025-04-07',6,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',97.49,'Mario','Rossi'),(21,'2025-04-07',6,'Via Roma 10, Milano','Via Roma 10, Milano','3201234567','mario.rossi@example.com',97.49,'Mario','Rossi'),(22,'2025-04-07',6,'via francesco 3, roma, 00012','via francesco 3, roma, 00012','1234567890','giuliopanza2000@gmail.com',112.49,'Giulio','Panza'),(23,'2025-04-07',6,'via francesco 3, roma, 00012','via francesco 3, , 00012','1234567890','giuliopanza2000@gmail.com',112.49,'Giulio','Panza'),(24,'2025-04-07',6,'via francesco 3, roma, 00012','via francesco 3, roma, 00012','1234567890','giuliopanza2000@gmail.com',112.49,'Giulio','Panza'),(25,'2025-04-07',6,'via francesco 3, roma, 00012','via francesco 3, roma, 00012','1234567890','giuliopanza2000@gmail.com',112.49,'Giulio','Panza'),(26,'2025-04-07',6,'via francesco 3, roma, 00012','via francesco 3, roma, 00012','1234567890','giuliopanza2000@gmail.com',112.49,'Giulio','Panza'),(27,'2025-04-08',6,'via francesco 3, roma, 00012','via francesco 3, roma, 00012','1234567890','giuliopanza2000@gmail.com',112.49,'Giulio','Panza'),(28,'2025-04-08',6,'via francesco 3, roma, 00012','via francesco 3, roma, 00012','1234567890','giuliopanza2000@gmail.com',112.49,'Giulio','Panza'),(29,'2025-04-08',6,'via francesco 3, roma, 00012','via francesco 3, , 00012','1234567890','giuliopanza2000@gmail.com',464.96,'Giulio','Panza'),(30,'2025-04-08',6,'via francesco 3, roma, 00012','via francesco 3, roma, 00012','1234567890','giuliopanza2000@gmail.com',202.49,'Giulio','Panza'),(31,'2025-04-08',NULL,'via francesco 3, roma, 00012','via francesco 3, roma, 00012','1234567890','giuliopanza2000@gmail.com',449.97,'Giulio','Panza');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_order`
--

DROP TABLE IF EXISTS `product_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_order` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `name_product` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `product_quantity` int NOT NULL,
  `order_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_order_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `product_order_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_order`
--

LOCK TABLES `product_order` WRITE;
/*!40000 ALTER TABLE `product_order` DISABLE KEYS */;
INSERT INTO `product_order` VALUES (1,1,'Nike Air Max 2024',129.99,1,1),(2,2,'Adidas Ultraboost',149.99,1,2),(3,3,'Puma RSX',109.99,1,3),(4,4,'Reebok Nano X',99.99,1,4),(5,5,'New Balance 574',119.99,1,5),(9,2,'Prodotto 2',129.99,1,7),(10,2,'Prodotto 2',129.99,1,8),(11,2,'Prodotto 2',129.99,1,9),(12,2,'Adidas Ultraboost',129.99,1,10),(13,2,'Adidas Ultraboost',129.99,1,11),(14,2,'Adidas Ultraboost',129.99,1,12),(15,2,'Adidas Ultraboost',129.99,1,13),(16,2,'Adidas Ultraboost',129.99,1,14),(17,2,'Prodotto 2',129.99,1,15),(18,2,'Prodotto 2',129.99,1,16),(20,2,'Adidas Ultraboost',129.99,1,18),(21,2,'Adidas Ultraboost',129.99,1,19),(22,2,'Adidas Ultraboost',129.99,1,20),(23,2,'Adidas Ultraboost',129.99,1,21),(24,2,'Adidas Ultraboost',149.99,1,22),(25,2,'Adidas Ultraboost',149.99,1,23),(26,2,'Adidas Ultraboost',149.99,1,24),(27,2,'Adidas Ultraboost',149.99,1,25),(28,2,'Adidas Ultraboost',149.99,1,26),(29,2,'Adidas Ultraboost',149.99,1,27),(30,2,'Adidas Ultraboost',149.99,1,28),(31,2,'Adidas Ultraboost',149.99,1,29),(32,5,'New Balance 574',119.99,2,29),(33,3,'Puma RSX',109.99,1,29),(34,5,'New Balance 574',119.99,1,29),(35,2,'Adidas Ultraboost',149.99,1,30),(36,5,'New Balance 574',119.99,1,30),(37,2,'Adidas Ultraboost',149.99,3,31);
/*!40000 ALTER TABLE `product_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `size_id` int unsigned NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_size_product_id_index` (`product_id`),
  KEY `product_size_size_id_index` (`size_id`),
  CONSTRAINT `product_size_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_size_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (1,1,3,19),(2,1,4,17),(3,1,5,15),(4,2,2,9),(5,2,3,5),(6,2,4,7),(7,3,3,9),(8,3,5,4),(9,3,6,4),(10,4,4,8),(11,4,5,6),(12,4,6,10),(13,5,2,11),(14,5,3,6),(15,5,5,6),(166,6,3,20),(167,6,4,10),(168,6,2,6),(169,7,2,20),(170,7,1,10),(171,7,4,6),(172,8,3,20),(173,8,4,10),(174,8,2,6),(175,9,3,20),(176,9,4,10),(177,9,2,6),(178,10,3,20),(179,10,4,10),(180,10,2,6),(181,11,3,20),(182,11,4,10),(183,12,2,6),(184,12,3,20),(185,13,4,10),(186,13,2,6),(187,13,3,20),(188,14,4,10),(189,14,2,6),(190,15,3,20),(191,15,4,10),(192,15,2,6),(193,16,3,20),(194,16,4,10),(195,16,2,6),(196,17,3,20),(197,17,4,10),(198,17,2,6),(199,18,3,20),(200,18,4,10),(201,18,2,6),(202,19,3,20),(203,19,4,10),(204,19,2,6),(205,20,3,20),(206,20,4,10),(207,20,2,6),(208,20,3,20),(209,21,4,10),(210,21,2,6),(211,21,3,20),(212,22,4,10),(213,22,2,6),(214,22,3,20),(215,23,4,10),(216,23,2,6),(217,23,3,20),(218,24,4,10),(219,24,2,6),(220,25,3,20),(221,25,4,10),(222,25,2,6),(223,26,3,20),(224,26,4,10),(225,26,2,6),(226,27,2,6),(227,27,2,6),(228,27,2,6),(229,28,2,6),(230,28,2,6),(231,28,2,6),(232,29,2,6),(233,29,2,6),(234,29,2,6),(235,30,2,6),(236,30,2,6),(237,30,2,6),(238,31,2,6),(239,31,2,6),(240,31,2,6);
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `brand_id` int unsigned DEFAULT NULL,
  `insert_date` date DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `category_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'nike-airmax-2024','Nike Air Max 2024','Scarpe da corsa super leggere e performanti','Nike_AirMax_2024.jpg',1,'2025-03-15',129.99,1),(2,'adidas-ultraboost','Adidas Ultraboost','Perfette per il comfort quotidiano','adidas_ultraboost.jpg',2,'2025-03-10',149.99,2),(3,'puma-rsx','Puma RSX','Sneakers dallo stile retrò con il massimo comfort','puma_rsx.jpg',3,'2025-03-05',109.99,2),(4,'reebok-nano-x','Reebok Nano X','Ideali per l’allenamento in palestra','reebok_nano_x.jpg',4,'2025-04-06',99.99,3),(5,'newbalance-574','New Balance 574','Stile classico con materiali premium','new-balance-574.jpg',5,'2024-05-20',119.99,2),(6,'nike-zoomx-2024','Nike ZoomX Vaporfly','Scarpa da corsa professionale','nike-zoomx-2024.jpg',1,'2024-01-15',199.99,1),(7,'adidas-adizero','Adidas Adizero Pro','Scarpa da corsa ultraleggera','adidas-adizero.jpg',2,'2024-02-10',179.99,1),(8,'puma-fast-rb','Puma Fast RB','Performance elevata per running','puma-fast-rb.jpg',3,'2024-03-05',159.99,1),(9,'reebok-floatride','Reebok Floatride','Scarpa running con tecnologia Floatride','reebok-floatride.jpg',4,'2024-04-01',129.99,1),(10,'new-balance-550','New Balance 550','Scarpa sportiva dal design vintage','new-balance-550.jpg',5,'2025-04-06',129.99,2),(11,'asics-gel-lyte','Asics Gel Lyte III','Scarpa casual con comfort superiore','asics-gel-lyte.jpg',6,'2024-06-25',139.99,2),(12,'nike-free-run','Nike Free Run','Scarpa flessibile per allenamenti','nike-free-run.jpg',1,'2024-01-30',139.99,3),(13,'new-balance-993','New Balance 993','Scarpa sportiva premium','new-balance-993.jpg',5,'2024-05-30',179.99,3),(14,'asics-gel-kayano','Asics Gel Kayano 29','Scarpa con stabilità superiore','asics-gel-kayano.jpg',6,'2024-06-28',189.99,3),(15,'nike-blazer','Nike Blazer Mid','Scarpa elegante con look retrò','nike-blazer.jpg',1,'2024-01-10',149.99,4),(16,'adidas-gazelle','Adidas Gazelle','Scarpa classica con design vintage','adidas-gazelle.jpg',2,'2024-02-14',119.99,4),(17,'puma-roma','Puma Roma','Scarpa minimal con stile raffinato','puma-roma.jpg',3,'2024-03-18',109.99,4),(18,'reebok-classic','Reebok Classic Leather','Eleganza e comfort senza tempo','reebok-classic.jpg',4,'2024-04-22',99.99,4),(19,'new-balance-327','New Balance 327','Scarpa elegante con tocco moderno','new-balance-327.jpg',5,'2024-05-25',129.99,4),(20,'asics-japan-s','Asics Japan S','Scarpa con ispirazione giapponese','asics-japan-s.jpg',6,'2024-06-30',139.99,4),(21,'nike-pegasus-trail','Nike Pegasus Trail','Scarpa da trail running','nike-pegasus-trail.jpg',1,'2024-01-05',159.99,5),(22,'adidas-terrex','Adidas Terrex Swift','Scarpa outdoor impermeabile','adidas-terrex.jpg',2,'2024-02-18',169.99,5),(23,'puma-x-ray','Puma X-Ray','Scarpa robusta per escursioni','puma-x-ray.jpg',3,'2024-03-22',149.99,5),(24,'reebok-ridge-rider','Reebok Ridge Rider','Scarpa resistente per hiking','reebok-ridge-rider.jpg',4,'2024-04-15',139.99,5),(25,'new-balance-hierro','New Balance Hierro','Scarpa perfetta per il trail','new-balance-hierro.jpg',5,'2024-05-28',189.99,5),(26,'asics-trabuco','Asics Gel Trabuco','Scarpa outdoor con grip superiore','asics-trabuco.jpg',6,'2024-06-10',179.99,5),(27,'nike-air-force-1','Nike Air Force 1','Scarpa nike professionale','nike-air-force-1.jpg',1,'2024-01-15',179.99,1),(28,'adidas-original-s-nmd-r1','Adidas Original S','Scarpa da apprezzare','adidas-original-s-nmd-r1.jpg',5,'2024-05-20',140.99,2),(29,'new-balance-574-grey','New Balance 574 grey','Scarpa sportiva premium','new-balance-574-grey.jpg',5,'2025-03-30',210.99,3),(30,'puma-suede-classic','Puma Suede Classic','Scarpa minimal con stile raffinato','puma-suede-classic.jpg',3,'2024-03-18',150.99,4),(31,'reebok-Club-C-85','Reebok Club C 85','Scarpa resistente per hiking','reebok-Club-C-85.jpg',4,'2024-04-15',169.99,5);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `size` smallint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,38),(2,39),(3,40),(4,41),(5,42),(6,43),(7,44);
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-09 10:30:19

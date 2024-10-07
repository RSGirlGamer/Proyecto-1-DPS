-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dps_project_admin_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Temporary view structure for view `allusersinclrole`
--

DROP TABLE IF EXISTS `allusersinclrole`;
/*!50001 DROP VIEW IF EXISTS `allusersinclrole`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `allusersinclrole` AS SELECT 
 1 AS `id`,
 1 AS `nombre_usuario`,
 1 AS `contrasena`,
 1 AS `correo_electronico`,
 1 AS `nombre_completo`,
 1 AS `estado`,
 1 AS `ultimo_acceso`,
 1 AS `creado_en`,
 1 AS `actualizado_en`,
 1 AS `rol_id`,
 1 AS `user_role`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `authentication_roles`
--

DROP TABLE IF EXISTS `authentication_roles`;
/*!50001 DROP VIEW IF EXISTS `authentication_roles`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `authentication_roles` AS SELECT 
 1 AS `nombre`,
 1 AS `usuario_id`,
 1 AS `puede_crear_proyectos`,
 1 AS `puede_editar_proyectos`,
 1 AS `puede_eliminar_proyectos`,
 1 AS `puede_editar_tareas`,
 1 AS `puede_crear_tareas`,
 1 AS `puede_eliminar_tareas`,
 1 AS `puede_ver_reportes`,
 1 AS `puede_ver_usuarios`,
 1 AS `puede_editar_usuarios`,
 1 AS `puede_eliminar_usuarios`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_user_comment` (`id_user`),
  KEY `id_task_comment` (`id_project`),
  CONSTRAINT `id_task_comment` FOREIGN KEY (`id_project`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_user_comment` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (1,1,2,'La base de datos ya está modificada!','2024-10-05 01:22:39'),(2,1,2,'Tengo un problema con el servicio de autenticación','2024-10-05 01:24:11'),(3,1,2,'Falta asignar los proyectos','2024-10-05 01:56:56'),(4,1,2,'Es necesario hacer los cambios','2024-10-05 01:57:14'),(6,10,2,'Estamos al pendiente con la tarea a asignar','2024-10-06 00:50:31');
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_id` int(11) NOT NULL,
  `puede_crear_proyectos` tinyint(1) DEFAULT 0,
  `puede_editar_proyectos` tinyint(1) DEFAULT 0,
  `puede_eliminar_proyectos` tinyint(1) DEFAULT 0,
  `puede_crear_tareas` tinyint(1) DEFAULT 0,
  `puede_editar_tareas` tinyint(1) DEFAULT 0,
  `puede_eliminar_tareas` tinyint(1) DEFAULT 0,
  `puede_ver_reportes` tinyint(1) DEFAULT 0,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `puede_ver_usuarios` tinyint(1) NOT NULL DEFAULT 0,
  `puede_editar_usuarios` tinyint(1) DEFAULT 0,
  `puede_eliminar_usuarios` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `permisos_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,5,1,1,1,1,1,1,1,'2024-09-15 02:17:29','2024-09-15 02:31:22',1,1,1),(2,1,1,1,1,1,1,1,1,'2024-10-06 11:31:14','2024-10-06 00:30:36',0,0,0),(3,2,1,1,0,1,1,0,0,'2024-10-06 05:31:20','2024-10-06 00:30:35',0,0,0),(4,3,0,0,0,0,0,0,0,'2024-10-06 05:31:24','2024-10-06 00:30:34',0,0,0),(5,4,0,0,0,0,0,0,1,'2024-10-06 05:31:27','2024-10-06 00:30:33',0,0,0);
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` enum('Activo','Inactivo','Finalizado') DEFAULT 'Activo',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (2,'Tarea DPS','Crear una aplicación web','2024-09-12','2024-10-05','Activo','2024-10-03 17:03:43','2024-10-05 03:48:47');
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos_usuarios`
--

DROP TABLE IF EXISTS `proyectos_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `proyectos_usuarios_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proyectos_usuarios_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos_usuarios`
--

LOCK TABLES `proyectos_usuarios` WRITE;
/*!40000 ALTER TABLE `proyectos_usuarios` DISABLE KEYS */;
INSERT INTO `proyectos_usuarios` VALUES (1,2,1),(2,2,3),(15,2,4),(16,2,5),(18,2,10);
/*!40000 ALTER TABLE `proyectos_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` enum('Scrum Master','PM','Programador','QA','Admin') NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Scrum Master','Responsable de la gestión del equipo Scrum y las ceremonias Scrum.'),(2,'PM','Project Manager, encargado de la planificación y supervisión de cada uno de los proyecto.'),(3,'Programador','Desarrollador encargado de llevar  las tareas técnicas.'),(4,'QA','Quality Assurance, encargado de las pruebas y aseguramiento de la calidad.'),(5,'Admin','Administrador del sistema con todos los permisos.');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proyecto_id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` enum('Pendiente','En Progreso','Completa') DEFAULT 'Pendiente',
  `prioridad` enum('Baja','Media','Alta') DEFAULT 'Media',
  `asignado_a` int(11) DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tareas_ibfk_1` (`proyecto_id`),
  KEY `tareas_ibfk_2` (`asignado_a`),
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tareas_ibfk_2` FOREIGN KEY (`asignado_a`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` VALUES (1,2,'Modificar base de datos','','En Progreso','Media',3,'2024-10-06','2024-10-04 18:35:51','2024-10-05 00:01:55'),(2,2,'Creación de Base de Datos','Crear Base de Datos en PostgreSQL','Completa','Alta',3,'2024-10-03','2024-10-04 18:41:57','2024-10-05 00:16:24'),(3,2,'Creación de Modelos en Backend','Crear los modelos que se ocuparan para el backend','Pendiente','Media',5,'2024-10-04','2024-10-04 18:43:57','2024-10-05 00:14:38'),(4,2,'Creación de Vista de Proyectos','Crear la vista que contendra a todos los proyectos','Pendiente','Alta',4,'2024-10-05','2024-10-04 18:44:48','2024-10-05 00:16:41');
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `tasksbyuser`
--

DROP TABLE IF EXISTS `tasksbyuser`;
/*!50001 DROP VIEW IF EXISTS `tasksbyuser`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tasksbyuser` AS SELECT 
 1 AS `id`,
 1 AS `nombre_completo`,
 1 AS `nombre_usuario`,
 1 AS `correo_electronico`,
 1 AS `role`,
 1 AS `task_title`,
 1 AS `project_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `usersbyproject`
--

DROP TABLE IF EXISTS `usersbyproject`;
/*!50001 DROP VIEW IF EXISTS `usersbyproject`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `usersbyproject` AS SELECT 
 1 AS `rol`,
 1 AS `usuario_id`,
 1 AS `rol_id`,
 1 AS `nombre_completo`,
 1 AS `project_id`,
 1 AS `user_id`,
 1 AS `nombre_proyecto`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `usuario_roles`
--

DROP TABLE IF EXISTS `usuario_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuario_roles_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `usuario_roles_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_roles`
--

LOCK TABLES `usuario_roles` WRITE;
/*!40000 ALTER TABLE `usuario_roles` DISABLE KEYS */;
INSERT INTO `usuario_roles` VALUES (1,1,5),(5,3,1),(6,4,2),(7,5,4),(13,10,3);
/*!40000 ALTER TABLE `usuario_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `nombre_completo` varchar(100) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` varchar(255) DEFAULT NULL,
  `ultimo_acceso` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'RS232827','$2a$12$bh/rNAZwUeup0ZsUoHDbu./V6MIO1UF4jlbkkbxeRXQSdfwYaADKC','deborabeatrizrivas@gmail.com','Débora Beatriz Rivas Sánchez','2024-09-18 00:11:17','2024-10-06 01:32:27','activo','2024-10-06 01:32:27'),(3,'GM232965','$2a$10$T02ymomNJ3B.Ig.O1WwJZ.33HAzVIVTF7OtdwXVeD3iP6rIdxj/je','jorgeluis@gmail.com','Jorge Luis Gonzalez Menjivar','2024-09-29 23:20:40','2024-10-06 01:44:21','activo',NULL),(4,'GD233362','$2a$10$tcaj5Kqs9XVZa8VYX11II.j5mwBWHVGBKdYT6C/hD/l1Lyf4zSnIW','glesi@gmail.com','Glesi Mayandy Galdamez De La Cruz ','2024-09-29 23:20:50','2024-10-06 01:44:28','activo','2024-10-06 01:44:28'),(5,'RJ201339','$2a$10$H2Ed6JuDPJPVh5MF4s1G5./F5LAZfUfF0exPLn.FO9n1QR5QPO1pa','carlosadonis@gmail.com','Carlos Adonis Rosales Jovel','2024-09-29 23:20:59','2024-10-06 01:43:58','activo',NULL),(10,'EETS2205','$2a$10$e3hPw0HiQiJc0ZuVXzJfe..p5ZdP9wGPzaHA9h1m8cnP2UpQw7ZN.','edetorresza@gmail.com','Edenilson Enrique Torres Saravia','2024-10-05 05:05:46','2024-10-06 01:32:10','activo','2024-10-06 01:32:10');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `allusersinclrole`
--

/*!50001 DROP VIEW IF EXISTS `allusersinclrole`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `allusersinclrole` AS select `u`.`id` AS `id`,`u`.`nombre_usuario` AS `nombre_usuario`,`u`.`contrasena` AS `contrasena`,`u`.`correo_electronico` AS `correo_electronico`,`u`.`nombre_completo` AS `nombre_completo`,`u`.`estado` AS `estado`,`u`.`ultimo_acceso` AS `ultimo_acceso`,`u`.`creado_en` AS `creado_en`,`u`.`actualizado_en` AS `actualizado_en`,`ur`.`rol_id` AS `rol_id`,`r`.`nombre` AS `user_role` from ((`usuarios` `u` join `usuario_roles` `ur` on(`u`.`id` = `ur`.`usuario_id`)) join `roles` `r` on(`ur`.`rol_id` = `r`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `authentication_roles`
--

/*!50001 DROP VIEW IF EXISTS `authentication_roles`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `authentication_roles` AS select `roles`.`nombre` AS `nombre`,`usuarios`.`id` AS `usuario_id`,`permisos`.`puede_crear_proyectos` AS `puede_crear_proyectos`,`permisos`.`puede_editar_proyectos` AS `puede_editar_proyectos`,`permisos`.`puede_eliminar_proyectos` AS `puede_eliminar_proyectos`,`permisos`.`puede_editar_tareas` AS `puede_editar_tareas`,`permisos`.`puede_crear_tareas` AS `puede_crear_tareas`,`permisos`.`puede_eliminar_tareas` AS `puede_eliminar_tareas`,`permisos`.`puede_ver_reportes` AS `puede_ver_reportes`,`permisos`.`puede_ver_usuarios` AS `puede_ver_usuarios`,`permisos`.`puede_editar_usuarios` AS `puede_editar_usuarios`,`permisos`.`puede_eliminar_usuarios` AS `puede_eliminar_usuarios` from (((`permisos` join `roles` on(`permisos`.`rol_id` = `roles`.`id`)) join `usuario_roles` on(`roles`.`id` = `usuario_roles`.`rol_id`)) join `usuarios` on(`usuario_roles`.`usuario_id` = `usuarios`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tasksbyuser`
--

/*!50001 DROP VIEW IF EXISTS `tasksbyuser`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tasksbyuser` AS select `u`.`id` AS `id`,`u`.`nombre_completo` AS `nombre_completo`,`u`.`nombre_usuario` AS `nombre_usuario`,`u`.`correo_electronico` AS `correo_electronico`,`r`.`nombre` AS `role`,`t`.`titulo` AS `task_title`,`p`.`nombre` AS `project_name` from ((((`usuarios` `u` join `tareas` `t` on(`u`.`id` = `t`.`asignado_a`)) join `proyectos` `p` on(`p`.`id` = `t`.`proyecto_id`)) join `usuario_roles` `ur` on(`ur`.`usuario_id` = `u`.`id`)) join `roles` `r` on(`r`.`id` = `ur`.`rol_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `usersbyproject`
--

/*!50001 DROP VIEW IF EXISTS `usersbyproject`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `usersbyproject` AS select `roles`.`nombre` AS `rol`,`usuario_roles`.`usuario_id` AS `usuario_id`,`usuario_roles`.`rol_id` AS `rol_id`,`usuarios`.`nombre_completo` AS `nombre_completo`,`proyectos_usuarios`.`project_id` AS `project_id`,`proyectos_usuarios`.`user_id` AS `user_id`,`proyectos`.`nombre` AS `nombre_proyecto` from ((((`proyectos_usuarios` join `proyectos` on(`proyectos_usuarios`.`project_id` = `proyectos`.`id`)) join `usuarios` on(`proyectos_usuarios`.`user_id` = `usuarios`.`id`)) join `usuario_roles` on(`usuarios`.`id` = `usuario_roles`.`usuario_id`)) join `roles` on(`usuario_roles`.`rol_id` = `roles`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-05 20:04:36

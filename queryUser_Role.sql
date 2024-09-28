DELIMITER $$

USE `dps_project_admin_db`$$

DROP VIEW IF EXISTS `allusersinclrole`$$

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `allusersinclrole` AS 
SELECT
  `u`.`id`                 AS `id`,
  `u`.`nombre_usuario`     AS `nombre_usuario`,
  `u`.`contrasena`         AS `contrasena`,
  `u`.`correo_electronico` AS `correo_electronico`,
  `u`.`nombre_completo`    AS `nombre_completo`,
  `u`.`estado`             AS `estado`,
  `u`.`ultimo_acceso`      AS `ultimo_acceso`,
  `u`.`creado_en`          AS `creado_en`,
  `u`.`actualizado_en`     AS `actualizado_en`,
  `ur`.`rol_id`            AS `rol_id`,
  `r`.`nombre`             AS `user_role`
FROM ((`usuarios` `u`
    JOIN `usuario_roles` `ur`
      ON ((`u`.`id` = `ur`.`usuario_id`)))
   JOIN `roles` `r`
     ON ((`ur`.`rol_id` = `r`.`id`)))$$

DELIMITER ;
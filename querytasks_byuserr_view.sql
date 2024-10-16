DELIMITER $$

USE `dps_project_admin_db`$$

DROP VIEW IF EXISTS `tasksbyuser`$$

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tasksbyuser` AS 
SELECT
  `u`.`id`		   AS `id`,
  `u`.`nombre_completo`    AS `nombre_completo`,
  `u`.`nombre_usuario`     AS `nombre_usuario`,
  `u`.`correo_electronico` AS `correo_electronico`,
  `r`.`nombre`             AS `role`,
  `t`.`titulo`             AS `task_title`,
  `p`.`nombre`             AS `project_name`
FROM ((((`usuarios` `u`
      JOIN `tareas` `t`
        ON ((`u`.`id` = `t`.`asignado_a`)))
     JOIN `proyectos` `p`
       ON ((`p`.`id` = `t`.`proyecto_id`)))
    JOIN `usuario_roles` `ur`
      ON ((`ur`.`usuario_id` = `u`.`id`)))
   JOIN `roles` `r`
     ON ((`r`.`id` = `ur`.`rol_id`)))$$

DELIMITER ;
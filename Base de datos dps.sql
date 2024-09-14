create database DPS_PROJECT_ADMIN_DB;

use DPS_PROJECT_ADMIN_DB;


CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre ENUM('Scrum Master', 'PM', 'Programador', 'QA', 'Admin') NOT NULL UNIQUE,
    descripcion TEXT
);


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    nombre_completo VARCHAR(100),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('Activo', 'Inactivo', 'Finalizado') DEFAULT 'Activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado ENUM('Pendiente', 'En Progreso', 'Completa') DEFAULT 'Pendiente',
    prioridad ENUM('Baja', 'Media', 'Alta') DEFAULT 'Media',
    asignado_a INT,
    fecha_vencimiento DATE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (asignado_a) REFERENCES usuarios(id)
);


CREATE TABLE permisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol_id INT NOT NULL,
    puede_crear_proyectos BOOLEAN DEFAULT FALSE,
    puede_editar_proyectos BOOLEAN DEFAULT FALSE,
    puede_eliminar_proyectos BOOLEAN DEFAULT FALSE,
    puede_crear_tareas BOOLEAN DEFAULT FALSE,
    puede_editar_tareas BOOLEAN DEFAULT FALSE,
    puede_eliminar_tareas BOOLEAN DEFAULT FALSE,
    puede_ver_reportes BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);


CREATE TABLE usuario_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);


INSERT INTO roles (nombre, descripcion) VALUES
('Scrum Master', 'Responsable de la gestión del equipo Scrum y las ceremonias Scrum.'),
('PM', 'Project Manager, encargado de la planificación y supervisión de cada uno de los proyecto.'),
('Programador', 'Desarrollador encargado de llevar  las tareas técnicas.'),
('QA', 'Quality Assurance, encargado de las pruebas y aseguramiento de la calidad.'),
('Admin', 'Administrador del sistema con todos los permisos.');

-- Version 2

ALTER TABLE permisos ADD puede_crear_usuarios BOOLEAN DEFAULT FALSE;
ALTER TABLE permisos ADD puede_editar_usuarios BOOLEAN DEFAULT FALSE;
ALTER TABLE permisos ADD puede_eliminar_usuarios BOOLEAN DEFAULT FALSE;
ALTER TABLE permisos ADD puede_ver_usuarios BOOLEAN DEFAULT FALSE;

ALTER TABLE usuarios
ADD estado ENUM('Activo', 'Inactivo', 'Suspendido') DEFAULT 'Activo' AFTER nombre_completo,
ADD ultimo_acceso TIMESTAMP NULL AFTER estado;

-- Permisos para Scrum Master
INSERT INTO permisos (rol_id, puede_crear_proyectos, puede_editar_proyectos, puede_eliminar_proyectos, puede_crear_tareas, puede_editar_tareas, puede_eliminar_tareas, puede_ver_reportes)
VALUES
(1, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE);

-- Permisos para PM (Project Manager)
INSERT INTO permisos (rol_id, puede_crear_proyectos, puede_editar_proyectos, puede_eliminar_proyectos, puede_crear_tareas, puede_editar_tareas, puede_eliminar_tareas, puede_ver_reportes)
VALUES
(2, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- Permisos para Programador
INSERT INTO permisos (rol_id, puede_crear_proyectos, puede_editar_proyectos, puede_eliminar_proyectos, puede_crear_tareas, puede_editar_tareas, puede_eliminar_tareas, puede_ver_reportes)
VALUES
(3, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- Permisos para QA (Quality Assurance)
INSERT INTO permisos (rol_id, puede_crear_proyectos, puede_editar_proyectos, puede_eliminar_proyectos, puede_crear_tareas, puede_editar_tareas, puede_eliminar_tareas, puede_ver_reportes)
VALUES
(4, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE);

-- Permisos para Admin (Administrador del sistema)
INSERT INTO permisos (rol_id, puede_crear_proyectos, puede_editar_proyectos, puede_eliminar_proyectos, puede_crear_tareas, puede_editar_tareas, puede_eliminar_tareas, puede_ver_reportes, puede_crear_usuarios, puede_editar_usuarios, puede_eliminar_usuarios, puede_ver_usuarios)
VALUES
(5, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- Insert para usuario con permisos de Administrador
INSERT INTO usuarios (nombre_usuario, contrasena, correo_electronico, nombre_completo, estado, creado_en, actualizado_en)
VALUES ('admin', '$2a$10$ErRixjb7v6eZ0QPoAti2fOXojYhqQbt3R2skhPV3iVgojCNIsl8O.', 'admin@mail.com', 'Admin', 'Activo', NOW(), NOW());

INSERT INTO usuario_roles (usuario_id, rol_id)
VALUES (1, 5);

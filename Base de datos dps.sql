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


select * from roles;



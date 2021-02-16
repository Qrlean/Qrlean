DROP DATABASE IF EXISTS QrLean;
CREATE DATABASE IF NOT EXISTS QrLean;
USE Qrlean;

/*==== Departamentos ====*/
CREATE TABLE Departamentos(
	id_departamento INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de los departamentos,su tipo de dato es INT y no puede ser null.',
    nombre_departamento VARCHAR(30) NOT NULL comment 'Campo correspondiente al nombre del departamento, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.'
);
/*==== Ciudades ====*/
CREATE TABLE Ciudades(
	id_ciudad INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de las ciudades,su tipo de dato es INT y no puede ser null.',
    nombre_ciudad VARCHAR(30) NOT NULL comment 'Campo correspondiente al nombre de la ciudad, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
    id_departamento INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Departamentos campo id_departamento,su tipo de dato es INT y no puede ser null',
    CONSTRAINT fkid_depertamento FOREIGN KEY(id_departamento) REFERENCES Departamentos(id_departamento)
);
/*==== Programas ====*/
CREATE TABLE Programas(
	id_programa INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de los programas,su tipo de dato es INT y no puede ser null.',
	nombre_programa VARCHAR(100) NOT NULL comment 'Campo correspondiente al nombre del programa, su tipo de dato es varchar con un maximo de 100 caracteres y no puede ser null.'
);
/*==== Tipo asignaturas ====*/
CREATE TABLE Asignaturas(
	id_asignatura INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de los tipos de asignaturas,su tipo de dato es INT y no puede ser null',
	nombre_asignatura VARCHAR(100) NOT NULL comment 'Campo correspondiente al nombre de la asignatura, su tipo de dato es varchar con un maximo de 100 caracteres y no puede ser null.'
);
/* ====Tipo asistencias====*/
CREATE TABLE Tipo_asistencias(
	id_tipo_asistencia INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de los tipos de asistencia,su tipo de dato es INT y no puede ser null',
	nombre_tipo_asistencia VARCHAR(25) NOT NULL comment 'Campo correspondiente al nombre del tipo de asistencia, su tipo de dato es varchar con un maximo de 25 caracteres y no puede ser null.'
 );
/* ====Tipo roles====*/
CREATE TABLE Tipo_roles(
	id_tipo_rol INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de los tipos de roles,su tipo de dato es INT y no puede ser null',
	nombre_rol VARCHAR(20) NOT NULL comment 'Campo correspondiente al nombre del tipo de rol, su tipo de dato es varchar con un maximo de 20 caracteres y no puede ser null.'
);
/* ====Tipo documento====*/
CREATE TABLE Tipo_documento(
	id_tipo_documento INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULl comment 'Campo correspondiente a la clave primaria de los tipos de documentos,su tipo de dato es INT y no puede ser null',
	descripcion VARCHAR(20) NOT NULL comment 'Campo correspondiente al nombre del tipo de documento, su tipo de dato es varchar con un maximo de 10 caracteres y no puede ser null.'
 );
/*==== Fichas ====*/
CREATE TABLE Ficha(
	id_ficha INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de las fichas,su tipo de dato es INT y no puede ser null',
	id_programa INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Programas campo id_programa,su tipo de dato es INT y no puede ser null',
	CONSTRAINT fkid_programa FOREIGN KEY(id_programa) REFERENCES Programas(id_programa)
);
/*==== Usuarios ====*/
CREATE TABLE Usuarios(
	id_usuario INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de los usuarios,su tipo de dato es INT y no puede ser null',
	nombres_usuario VARCHAR(30) NOT NULL comment 'Campo correspondiente a los nombres del usuario, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
    apellidos_usuario VARCHAR(30) NOT NULL comment 'Campo correspondiente a los apellidos del usuario, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
	numero_documento BIGINT NOT NULL UNIQUE comment 'Campo correspondiente a el numero de documento del usuario, su tipo de dato es BIGINT y no puede ser null.',
	id_tipo_documento INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_documento campo id_tipo_documento,su tipo de dato es INT y no puede ser null',
	password VARCHAR(150) NOT NULL comment 'Campo correspondiente a la contraseña hasheada del usuario, su tipo de dato es varchar con un maximo de 150 caracteres y no puede ser null.',
	direccion_residencial VARCHAR(60) comment 'Campo correspondiente a la direccion recidencial del usuario, su tipo de dato es varchar con un maximo de 60 caracteres',
    id_ciudad INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ciudades campo id_ciudad,su tipo de dato es INT y no puede ser null',
	id_tipo_rol INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_roles campo id_tipo_rol,su tipo de dato es INT y no puede ser null',
    emailInstitucional VARCHAR(100) NOT NULL comment 'Campo correspondiente a el email institucional del usuario, su tipo de dato es varchar con un maximo de 100 caracteres y no puede ser null.',
	telefono_movil BIGINT NOT NULL comment 'Campo correspondiente a el telefono movil del usuario, su tipo de dato es BIGINT',
    CONSTRAINT fkid_tipo_rol FOREIGN KEY(id_tipo_rol) REFERENCES Tipo_roles(id_tipo_rol),
	CONSTRAINT fkid_tipo_documento FOREIGN KEY(id_tipo_documento) REFERENCES Tipo_documento(id_tipo_documento),
    CONSTRAINT fkid_ciudades FOREIGN KEY(id_ciudad) REFERENCES Ciudades(id_ciudad)
);
/*==== Asociaciones usuarios - fichas ====*/
CREATE TABLE Asociacion_usuarios_fichas(
	id_asociacion_usuario_ficha INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de la asociacion entre usuaros y fichas,su tipo de dato es INT y no puede ser null',
    id_usuario INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
    id_ficha INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ficha campo id_ficha,su tipo de dato es INT y no puede ser null',
    CONSTRAINT fkid_usuario FOREIGN KEY(id_usuario) REFERENCES Usuarios(id_usuario),
	CONSTRAINT fkid_fichaUsuario FOREIGN KEY(id_ficha) REFERENCES Ficha(id_ficha)
);
/*==== Solicitudes cambio de asistencias ====*/
CREATE TABLE Solicitudes_cambio_asistencia(
	id_solicitud INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de la solicitud de cambio de asistencia,su tipo de dato es INT y no puede ser null',
    asunto VARCHAR(50) NOT NULL comment 'Campo correspondiente al asunto de la solicitud de cambio de asistencia, su tipo de dato es varchar con un maximo de 50 caracteres y no puede ser null.',
    contenido TEXT NOT NULL comment 'Campo correspondiente al contenido de la solicitud de cambio de asistencia, su tipo de dato es TEXT y no puede ser null.',
    id_aprendiz INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
    id_instructor INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
    id_ficha INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ficha campo id_ficha,su tipo de dato es INT y no puede ser null',
    CONSTRAINT fkid_fichaSolicitudes FOREIGN KEY(id_ficha) REFERENCES Ficha(id_ficha),
	CONSTRAINT fkid_aprendiz FOREIGN KEY(id_aprendiz) REFERENCES Usuarios(id_usuario),
	CONSTRAINT fkid_instructor FOREIGN KEY(id_instructor) REFERENCES Usuarios(id_usuario)
);
/*==== Asociacion asignaturas fichas ====*/
CREATE TABLE Asociacion_asignaturas_fichas(
	id_asociacion_asignatura_ficha INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de la asociacion de la asignatura a la ficha,su tipo de dato es INT y no puede ser null',
    id_asignatura INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_asignaturas campo id_tipo_asignatura,su tipo de dato es INT y no puede ser null',
    id_ficha INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ficha campo id_ficha,su tipo de dato es INT y no puede ser null',
    id_instructor INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
    CONSTRAINT fkid_instructorAsignatura FOREIGN KEY(id_instructor) REFERENCES Usuarios(id_usuario),
    CONSTRAINT fkid_asignatura FOREIGN KEY(id_asignatura) REFERENCES Asignaturas(id_asignatura),
	CONSTRAINT fkid_ficha FOREIGN KEY(id_ficha) REFERENCES Ficha(id_ficha)
);
/*==== Clases de las fichas ====*/
CREATE TABLE Clase(
	id_clase INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de la clase,su tipo de dato es INT y no puede ser null',
    nombre_clase VARCHAR(30) NOT NULL comment 'Campo correspondiente al nombre de la clase, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
    dia DATE NOT NULL comment 'Campo correspondiente al dia (fecha) de la clase, su tipo de dato es DATE y no puede ser null.',
    hora_inicio TIME NOT NULL comment 'Campo correspondiente a la hora de inicio de la clase, su tipo de dato es TIME y no puede ser null.',
    hora_final TIME NOT NULL comment 'Campo correspondiente a la hora de final de la clase, su tipo de dato es TIME y no puede ser null.',
    id_asociacion_asignatura_ficha INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Asociacion_asignaturas campo id_asociacion_asignatura,su tipo de dato es INT y no puede ser null',
    CONSTRAINT fkid_asociacion_asignatura FOREIGN KEY(id_asociacion_asignatura_ficha) REFERENCES Asociacion_asignaturas_fichas(id_asociacion_asignatura_ficha)
);
/*==== Asistencias de las fichas ====*/
CREATE TABLE Asistencias(
	id_asistencia INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de la asistencia,su tipo de dato es INT y no puede ser null',
    id_tipo_asistencia INT NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_asistencias campo id_tipo_asistencia,su tipo de dato es INT y no puede ser null', 
    id_aprendiz INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
    id_clase INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
    hora_firmada timestamp NOT NULL comment 'Campo correspondiente a la hora la cual fue creado el registro, su tipo de dato es TIMESTAMP y no puede ser null.',
    CONSTRAINT fkid_tipo_asistencia FOREIGN KEY(id_tipo_asistencia) REFERENCES Tipo_asistencias(id_tipo_asistencia),
    CONSTRAINT fkid_aprendizAsistencia FOREIGN KEY(id_aprendiz) REFERENCES Usuarios(id_usuario),
    CONSTRAINT fkid_clase FOREIGN KEY(id_clase) REFERENCES Clase(id_clase)
);



/*INSERTAR DEPARTAMENTOS*/
INSERT INTO QrLean.Departamentos (nombre_departamento) VALUES ('Amazonas'),('Antioquia'),('Arauca'),('Atlántico'),('Bolívar'),('Boyacá'),('Caldas'),('Caquetá'),('Casanare'),('Cauca'),('Cesar'),('Chocó'),('Córdoba'),('Cundinamarca'),('Distrito_Capital'),('Guainía'),('Guaviare'),('Huila'),('Guajira'),('Magdalena'),('Meta'),('Nariño'),('Norte_Santander'),('Putumayo'),('Quindío'),('Risaralda'),('San_Andrés'),('Santander'),('Sucre'),('Tolima'),('Valle'),('Vaupés'),('Vichada');
SELECT * FROM qrlean.departamentos;

/*Insertar ciudades*/
INSERT INTO Qrlean.ciudades (nombre_ciudad,id_departamento) VALUES ('Bogotá',15),('Medellín',2),('Santiago_de_Cali',31),('Barranquilla',4),('Cartagena',5),('San_Jose_de_Cucuta',23),('Bucaramanga',28),('Soledad',4),('Ibagué',30),('Soacha',14),('Pereira',26),('Santa_Marta',20),('Villavicencio',21),('Bello',2),('Valledupar',11),('Pasto',22),('Buenaventuta',31),('Montería',13),('Manizales',7);

INSERT INTO Programas(nombre_programa) VALUES ('Contabilidad y finanzas'),('Gestiîn administrativa'),('Gestion bancaria y de entidades financieras'),('Gestion de negocios'),('Gestion empresarial'),('Gestion empresarial'),('Mecanico de maquinaria industrial');
SELECT * from qrlean.programas;

INSERT INTO asignaturas(nombre_asignatura) VALUES ('Ingles'),('Promover'),('Tecnica');
SELECT * from qrlean.asignaturas;

INSERT INTO Tipo_asistencias(nombre_tipo_asistencia) VALUES ('Asistio'),('No asistio'),('Asistio con retardo'),('No asistio justificado');
SELECT * from qrlean.tipo_asistencias;

INSERT INTO Tipo_roles(nombre_rol) VALUES ('Aprendiz'),('Instructor'),('Administrador');
SELECT * from qrlean.Tipo_roles;

INSERT INTO Tipo_documento(descripcion) VALUES ('Tarjeta de identidad'),('Cedula de ciudadania'),('Cedula extranjeria'),('Pasaporte');
SELECT * from qrlean.Tipo_documento;

INSERT INTO Ficha(id_programa) VALUES (1),(2),(3),(4),(5);
SELECT * from qrlean.ficha;

INSERT INTO Usuarios(nombres_usuario,apellidos_usuario,numero_documento,id_tipo_documento,id_tipo_rol,password,direccion_residencial,id_ciudad,telefono_movil,emailInstitucional) VALUES 
('Hedda', 'Reuss', 8250167828,1,1,'a4322fda0d314e2d4e242b46fe76118d', '4094 East Road',1, 3270821745,'cgarcia369@misena.edu.co'),
('Kathie', 'Alvar', 3320320687,2,2, '0cc2ac8f98fd0177fae6f89097ada9f3', '73 Everett Court',2, 3883424358,'cgarcia369@misena.edu.co'),
('Katuscha', 'Grishechkin', 8247825346,3,1, 'ebd48af1f270ef21f943579532a96fd1', '93699 Rockefeller Crossing',3, 3641176178,'cgarcia369@misena.edu.co'),
('Romola', 'Rignoldes', 7577745441,4,2, '3a698de0ab79d99c1f23dc98030bfdcd', '619 Harbort Road',4, 3778849875,'cgarcia369@misena.edu.co'),
('Adam', 'Mallinson', 9387752664,1,1, '3c217680c043d31e2a2721e0f0805aeb', '27 Valley Edge Trail',5, 3435608935,'cgarcia369@misena.edu.co'),
('Caro', 'Itshak', 7398010323,2,2, 'd86f6ce759ebc50f76d28eafc3aca084', '9 Mendota Crossing',6, 3519855506,'cgarcia369@misena.edu.co'),
('Correna', 'Bulpitt', 7687899597,3,1, '72b8ca963b02d9a2e4f39b2b775c5d16', '53 Algoma Crossing',7, 3322503446,'cgarcia369@misena.edu.co'),
('Ethelind', 'Elington', 7800333589,4,2, '5980e0949699d60a6f86e478dd8d3c94', '74722 Forster Lane',8, 3915008778,'cgarcia369@misena.edu.co'),
('Cameron', 'MacNockater', 3007853484,1,1, 'df861fe91302ceb317252a07f64470be', '67 Scofield Place',9, 3559894963,'cgarcia369@misena.edu.co'),
('Lil', 'Kirwood', 3496939225,2,3, '72b1797ecc21c2319bda0d9053ce7f48', '5150 Randy Trail',10, 3690521840,'cgarcia369@misena.edu.co');
SELECT * FROM qrlean.Usuarios;


INSERT INTO Asociacion_usuarios_fichas(id_usuario,id_ficha) VALUES (1,1),(2,1),(3,2),(4,2),(5,3),(6,3),(7,4),(8,4),(9,5),(2,5);
SELECT * FROM qrlean.Asociacion_usuarios_fichas;


INSERT INTO Solicitudes_cambio_asistencia(asunto,contenido,id_aprendiz,id_instructor,id_ficha) VALUES 
('Lorem ipsum dolor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et laoreet nisl. Phasellus viverra turpis ligula, eu lobortis diam venenatis in. Mauris gravida mauris vel iaculis viverra. Etiam eu lacus ex. Nam rutrum dolor euismod nisl commodo, vitae viverra lorem convallis. Suspendisse faucibus metus leo, vitae mattis purus vehicula quis. Nam egestas porttitor tristique. Nunc vitae erat eu massa maximus porta. Donec tincidunt, leo accumsan consequat porttitor, augue justo euismod sem, ac luctus tortor nulla accumsan quam. Sed sollicitudin sapien nec nunc faucibus ullamcorper.',1,2,1),
('Lorem ipsum dolor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et laoreet nisl. Phasellus viverra turpis ligula, eu lobortis diam venenatis in. Mauris gravida mauris vel iaculis viverra. Etiam eu lacus ex. Nam rutrum dolor euismod nisl commodo, vitae viverra lorem convallis. Suspendisse faucibus metus leo, vitae mattis purus vehicula quis. Nam egestas porttitor tristique. Nunc vitae erat eu massa maximus porta. Donec tincidunt, leo accumsan consequat porttitor, augue justo euismod sem, ac luctus tortor nulla accumsan quam. Sed sollicitudin sapien nec nunc faucibus ullamcorper.',1,2,1),
('Lorem ipsum dolor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et laoreet nisl. Phasellus viverra turpis ligula, eu lobortis diam venenatis in. Mauris gravida mauris vel iaculis viverra. Etiam eu lacus ex. Nam rutrum dolor euismod nisl commodo, vitae viverra lorem convallis. Suspendisse faucibus metus leo, vitae mattis purus vehicula quis. Nam egestas porttitor tristique. Nunc vitae erat eu massa maximus porta. Donec tincidunt, leo accumsan consequat porttitor, augue justo euismod sem, ac luctus tortor nulla accumsan quam. Sed sollicitudin sapien nec nunc faucibus ullamcorper.',1,2,1),
('Lorem ipsum dolor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et laoreet nisl. Phasellus viverra turpis ligula, eu lobortis diam venenatis in. Mauris gravida mauris vel iaculis viverra. Etiam eu lacus ex. Nam rutrum dolor euismod nisl commodo, vitae viverra lorem convallis. Suspendisse faucibus metus leo, vitae mattis purus vehicula quis. Nam egestas porttitor tristique. Nunc vitae erat eu massa maximus porta. Donec tincidunt, leo accumsan consequat porttitor, augue justo euismod sem, ac luctus tortor nulla accumsan quam. Sed sollicitudin sapien nec nunc faucibus ullamcorper.',1,2,1),
('Lorem ipsum dolor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et laoreet nisl. Phasellus viverra turpis ligula, eu lobortis diam venenatis in. Mauris gravida mauris vel iaculis viverra. Etiam eu lacus ex. Nam rutrum dolor euismod nisl commodo, vitae viverra lorem convallis. Suspendisse faucibus metus leo, vitae mattis purus vehicula quis. Nam egestas porttitor tristique. Nunc vitae erat eu massa maximus porta. Donec tincidunt, leo accumsan consequat porttitor, augue justo euismod sem, ac luctus tortor nulla accumsan quam. Sed sollicitudin sapien nec nunc faucibus ullamcorper.',1,2,1);
SELECT * FROM qrlean.Solicitudes_cambio_asistencia;

INSERT INTO Asociacion_asignaturas_fichas(id_asignatura,id_ficha,id_instructor) VALUES (3,1,2),(3,2,4),(3,3,6),(3,4,8),(3,5,2);
SELECT * FROM qrlean.Asociacion_asignaturas_fichas;

INSERT INTO Clase(nombre_clase,dia,hora_inicio,hora_final,id_asociacion_asignatura_ficha) VALUES ('Como programar','2021-05-05','12:05:05','12:05:05',1);
Select * from qrlean.clase;

INSERT INTO Asistencias(id_tipo_asistencia,id_aprendiz,id_clase) VALUES (1,1,1);
Select * from qrlean.asistencias;

/* ==== Ver las materias que hay ====*/
SELECT asociacion_asignaturas_fichas.id_asociacion_asignatura_ficha AS id ,asignaturas.nombre_asignatura,ficha.id_ficha,usuarios.nombres_usuario AS NombresInstructor, usuarios.apellidos_usuario AS ApellidosInstructor from qrlean.asociacion_asignaturas_fichas
	INNER JOIN qrlean.asignaturas ON asignaturas.id_asignatura = asociacion_asignaturas_fichas.id_asignatura
	INNER JOIN qrlean.ficha ON ficha.id_ficha = asociacion_asignaturas_fichas.id_ficha
    INNER JOIN qrlean.usuarios ON usuarios.id_usuario = asociacion_asignaturas_fichas.id_instructor
;

/* ==== Traer la informacion de una ficha ==== */

SELECT ficha.id_ficha,programas.nombre_programa FROM qrlean.ficha 
INNER JOIN qrlean.programas ON ficha.id_programa=programas.id_programa;

/* ==== Traer toda la informacion de una ciudad*/

SELECT ciudades.id_ciudad,ciudades.nombre_ciudad,departamentos.nombre_departamento FROM qrlean.ciudades INNER JOIN qrlean.departamentos ON ciudades.id_departamento=departamentos.id_departamento ;

/* ==== Traer toda la informacion de una asistencia ==== */

SELECT asistencias.id_asistencia,asistencias.id_aprendiz,asistencias.hora_firmada,clase.nombre_clase,clase.dia,clase.hora_inicio,clase.hora_final,tipo_asistencias.nombre_tipo_asistencia AS TipoAsistencia FROM qrlean.asistencias 
	INNER JOIN qrlean.clase ON asistencias.id_clase = clase.id_clase
	INNER JOIN qrlean.tipo_asistencias ON asistencias.id_tipo_asistencia = tipo_asistencias.id_tipo_asistencia;
    
/* ==== Traer toda la informacion de un usuario ==== */
SELECT usuarios.id_usuario,usuarios.nombres_usuario,usuarios.apellidos_usuario,usuarios.numero_documento,usuarios.password,usuarios.direccion_residencial,usuarios.telefono_movil,usuarios.emailInstitucional,tipo_documento.descripcion as TipoDocumento ,tipo_roles.nombre_rol AS Rol , Ciudades.nombre_ciudad as Ciudad ,departamentos.nombre_departamento as Departamento ,asociacion_usuarios_fichas.id_ficha As NumeroFicha,programas.nombre_programa as NombrePrograma FROM qrlean.usuarios
	INNER JOIN qrlean.Tipo_documento ON usuarios.id_tipo_documento=tipo_documento.id_tipo_documento
    INNER JOIN qrlean.tipo_roles ON usuarios.id_tipo_rol=tipo_roles.id_tipo_rol
    INNER JOIN qrlean.ciudades ON usuarios.id_ciudad=ciudades.id_ciudad
    INNER JOIN qrlean.departamentos ON ciudades.id_departamento=departamentos.id_departamento
    INNER JOIN qrlean.asociacion_usuarios_fichas ON usuarios.id_usuario=asociacion_usuarios_fichas.id_usuario
    INNER JOIN qrlean.ficha ON asociacion_usuarios_fichas.id_ficha=ficha.id_ficha
    INNER JOIN qrlean.programas ON ficha.id_programa=programas.id_programa
    ORDER BY usuarios.id_usuario;
/*
SET FOREIGN_KEY_CHECKS = 0; 
TRUNCATE table qrlean.Asociacion_asignaturas; 
SET FOREIGN_KEY_CHECKS = 1;*/

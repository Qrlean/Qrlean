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
CREATE TABLE Tipo_asignaturas(
	id_tipo_asignatura INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de los tipos de asignaturas,su tipo de dato es INT y no puede ser null',
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
	numero_documento BIGINT NOT NULL UNIQUE comment 'Campo correspondiente a el numero de documento del usuario, su tipo de dato es BIGINT y no puede ser null.',
	apellidos_usuario VARCHAR(30) NOT NULL comment 'Campo correspondiente a los apellidos del usuario, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
	id_tipo_documento INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_documento campo id_tipo_documento,su tipo de dato es INT y no puede ser null',
    id_tipo_rol INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_roles campo id_tipo_rol,su tipo de dato es INT y no puede ser null',
	password VARCHAR(150) NOT NULL comment 'Campo correspondiente a la contraseña hasheada del usuario, su tipo de dato es varchar con un maximo de 150 caracteres y no puede ser null.',
	direccion_recidencial VARCHAR(60) comment 'Campo correspondiente a la direccion recidencial del usuario, su tipo de dato es varchar con un maximo de 60 caracteres',
    id_ciudad INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ciudades campo id_ciudad,su tipo de dato es INT y no puede ser null',
	telefono_movil BIGINT NOT NULL comment 'Campo correspondiente a el telefono movil del usuario, su tipo de dato es BIGINT',
    CONSTRAINT fkid_tipo_rol FOREIGN KEY(id_tipo_rol) REFERENCES Tipo_roles(id_tipo_rol),
	CONSTRAINT fkid_tipo_documento FOREIGN KEY(id_tipo_documento) REFERENCES Tipo_documento(id_tipo_documento),
    CONSTRAINT fkid_ciudades FOREIGN KEY(id_ciudad) REFERENCES Ciudades(id_ciudad)
);
/*==== Correos ====*/
CREATE TABLE Correos(
	id_correo INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de los correos,su tipo de dato es INT y no puede ser null',
    email VARCHAR(100) NOT NULL comment 'Campo correspondiente a el email del usuario, su tipo de dato es varchar con un maximo de 100 caracteres y no puede ser null.',
    id_usuario INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ciudades campo id_ciudad,su tipo de dato es INT y no puede ser null',
    CONSTRAINT fkid_usuarioCorreo FOREIGN KEY(id_usuario) REFERENCES Usuarios(id_usuario)
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
CREATE TABLE Asociacion_asignaturas(
	id_asociacion_asignatura INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de la asociacion de la asignatura a la ficha,su tipo de dato es INT y no puede ser null',
    id_tipo_asignatura INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_asignaturas campo id_tipo_asignatura,su tipo de dato es INT y no puede ser null',
    id_ficha INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ficha campo id_ficha,su tipo de dato es INT y no puede ser null',
    id_instructor INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
    CONSTRAINT fkid_instructorAsignatura FOREIGN KEY(id_instructor) REFERENCES Usuarios(id_usuario),
    CONSTRAINT fkid_tipo_asignatura FOREIGN KEY(id_tipo_asignatura) REFERENCES Tipo_asignaturas(id_tipo_asignatura),
	CONSTRAINT fkid_ficha FOREIGN KEY(id_ficha) REFERENCES Ficha(id_ficha)
);
/*==== Clases de las fichas ====*/
CREATE TABLE Clase(
	id_clase INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL comment 'Campo correspondiente a la clave primaria de la clase,su tipo de dato es INT y no puede ser null',
    nombre_clase VARCHAR(30) NOT NULL comment 'Campo correspondiente al nombre de la clase, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
    dia DATE NOT NULL comment 'Campo correspondiente al dia (fecha) de la clase, su tipo de dato es DATE y no puede ser null.',
    hora_inicio TIME NOT NULL comment 'Campo correspondiente a la hora de inicio de la clase, su tipo de dato es TIME y no puede ser null.',
    hora_final TIME NOT NULL comment 'Campo correspondiente a la hora de final de la clase, su tipo de dato es TIME y no puede ser null.',
    id_asignatura INT NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Asociacion_asignaturas campo id_asociacion_asignatura,su tipo de dato es INT y no puede ser null',
    CONSTRAINT fkid_asociacion_asignatura FOREIGN KEY(id_asignatura) REFERENCES Asociacion_asignaturas(id_asociacion_asignatura)
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
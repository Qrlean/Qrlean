-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema qrlean
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema qrlean
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `qrlean` DEFAULT CHARACTER SET utf8mb4 ;
USE `qrlean` ;

-- -----------------------------------------------------
-- Table `qrlean`.`asignaturas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`asignaturas` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`asignaturas` (
  `id_asignatura` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de los tipos de asignaturas,su tipo de dato es INT y no puede ser null',
  `nombre_asignatura` VARCHAR(100) NOT NULL comment 'Campo correspondiente al nombre de la asignatura, su tipo de dato es varchar con un maximo de 100 caracteres y no puede ser null.',
  PRIMARY KEY (`id_asignatura`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `qrlean`.`programas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`programas` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`programas` (
  `id_programa` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de los programas,su tipo de dato es INT y no puede ser null.',
  `nombre_programa` VARCHAR(100) NOT NULL comment 'Campo correspondiente al nombre del programa, su tipo de dato es varchar con un maximo de 100 caracteres y no puede ser null.',
  PRIMARY KEY (`id_programa`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `qrlean`.`fichas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`fichas` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`fichas` (
  `id_ficha` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de las fichas,su tipo de dato es INT y no puede ser null',
  `id_programa` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Programas campo id_programa,su tipo de dato es INT y no puede ser null',
  PRIMARY KEY (`id_ficha`, `id_programa`),
  CONSTRAINT `fichas_ibfk_1`
    FOREIGN KEY (`id_programa`)
    REFERENCES `qrlean`.`programas` (`id_programa`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `id_programa` ON `qrlean`.`fichas` (`id_programa` ASC);


-- -----------------------------------------------------
-- Table `qrlean`.`tipo_documento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`tipo_documento` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`tipo_documento` (
  `id_tipo_documento` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de los tipos de documentos,su tipo de dato es INT y no puede ser null' ,
  `descripcion` VARCHAR(30) NOT NULL comment 'Campo correspondiente al nombre del tipo de documento, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
  PRIMARY KEY (`id_tipo_documento`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `qrlean`.`tipo_roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`tipo_roles` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`tipo_roles` (
  `id_tipo_rol` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de los tipos de roles,su tipo de dato es INT y no puede ser null',
  `nombre_rol` VARCHAR(20) NOT NULL comment 'Campo correspondiente al nombre del tipo de rol, su tipo de dato es varchar con un maximo de 20 caracteres y no puede ser null.',
  PRIMARY KEY (`id_tipo_rol`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `qrlean`.`departamentos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`departamentos` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`departamentos` (
  `id_departamento` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de los departamentos,su tipo de dato es INT y no puede ser null.',
  `nombre_departamento` VARCHAR(30) NOT NULL comment 'Campo correspondiente al nombre del departamento, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
  PRIMARY KEY (`id_departamento`))
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `qrlean`.`ciudades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`ciudades` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`ciudades` (
  `id_ciudad` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de las ciudades,su tipo de dato es INT y no puede ser null.',
  `nombre_ciudad` VARCHAR(30) NOT NULL comment 'Campo correspondiente al nombre de la ciudad, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
  `id_departamento` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Departamentos campo id_departamento,su tipo de dato es INT y no puede ser null',
  PRIMARY KEY (`id_ciudad`, `id_departamento`),
  CONSTRAINT `ciudades_ibfk_1`
    FOREIGN KEY (`id_departamento`)
    REFERENCES `qrlean`.`departamentos` (`id_departamento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `id_departamento` ON `qrlean`.`ciudades` (`id_departamento` ASC) ;


-- -----------------------------------------------------
-- Table `qrlean`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`usuarios` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de los usuarios,su tipo de dato es INT y no puede ser null',
  `nombres_usuario` VARCHAR(30) NOT NULL comment 'Campo correspondiente a los nombres del usuario, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
  `apellidos_usuario` VARCHAR(30) NOT NULL comment 'Campo correspondiente a los apellidos del usuario, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
  `numero_documento` BIGINT(20) UNIQUE NOT NULL comment 'Campo correspondiente a el numero de documento del usuario, su tipo de dato es BIGINT y no puede ser null.',
  `password` VARCHAR(150) NOT NULL comment 'Campo correspondiente a la contraseña hasheada del usuario, su tipo de dato es varchar con un maximo de 150 caracteres y no puede ser null.',
  `emailInstitucional` VARCHAR(100) NOT NULL UNIQUE comment 'Campo correspondiente a el email institucional del usuario, su tipo de dato es varchar con un maximo de 100 caracteres y no puede ser null.',
  `direccion_residencial` VARCHAR(60) NULL DEFAULT NULL comment 'Campo correspondiente a la direccion recidencial del usuario, su tipo de dato es varchar con un maximo de 60 caracteres',
  `telefono_movil` INT(11) UNIQUE NULL DEFAULT NULL comment 'Campo correspondiente a el telefono movil del usuario, su tipo de dato es BIGINT',
  `id_tipo_documento` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_documento campo id_tipo_documento,su tipo de dato es INT y no puede ser null',
  `id_tipo_rol` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_roles campo id_tipo_rol,su tipo de dato es INT y no puede ser null',
  `id_ciudad` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ciudades campo id_ciudad,su tipo de dato es INT y no puede ser null',
  PRIMARY KEY (`id_usuario`, `id_ciudad`, `id_tipo_documento`, `id_tipo_rol`),
  CONSTRAINT `usuarios_ibfk_1`
    FOREIGN KEY (`id_tipo_documento`)
    REFERENCES `qrlean`.`tipo_documento` (`id_tipo_documento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_2`
    FOREIGN KEY (`id_tipo_rol`)
    REFERENCES `qrlean`.`tipo_roles` (`id_tipo_rol`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_3`
    FOREIGN KEY (`id_ciudad`)
    REFERENCES `qrlean`.`ciudades` (`id_ciudad`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE UNIQUE INDEX `numero_documento` ON `qrlean`.`usuarios` (`numero_documento` ASC) ;

CREATE UNIQUE INDEX `emailInstitucional` ON `qrlean`.`usuarios` (`emailInstitucional` ASC) ;

CREATE INDEX `id_tipo_documento` ON `qrlean`.`usuarios` (`id_tipo_documento` ASC) ;

CREATE INDEX `id_tipo_rol` ON `qrlean`.`usuarios` (`id_tipo_rol` ASC) ;

CREATE INDEX `id_ciudad` ON `qrlean`.`usuarios` (`id_ciudad` ASC) ;


-- -----------------------------------------------------
-- Table `qrlean`.`asociacion_asignaturas_fichas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`asociacion_asignaturas_fichas` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`asociacion_asignaturas_fichas` (
  `id_asociacion_asignatura_ficha` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de la asociacion de la asignatura a la ficha,su tipo de dato es INT y no puede ser null',
  `id_ficha` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ficha campo id_ficha,su tipo de dato es INT y no puede ser null',
  `id_asignatura` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_asignaturas campo id_tipo_asignatura,su tipo de dato es INT y no puede ser null',
  `id_instructor` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
  PRIMARY KEY (`id_asociacion_asignatura_ficha`, `id_instructor`, `id_ficha`, `id_asignatura`),
  CONSTRAINT `asociacion_asignaturas_fichas_ibfk_1`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `qrlean`.`fichas` (`id_ficha`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `asociacion_asignaturas_fichas_ibfk_2`
    FOREIGN KEY (`id_asignatura`)
    REFERENCES `qrlean`.`asignaturas` (`id_asignatura`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `asociacion_asignaturas_fichas_ibfk_3`
    FOREIGN KEY (`id_instructor`)
    REFERENCES `qrlean`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE UNIQUE INDEX `asociacion_asignaturas_fichas_id_asignatura_id_ficha_unique` ON `qrlean`.`asociacion_asignaturas_fichas` (`id_ficha` ASC, `id_asignatura` ASC) ;

CREATE INDEX `id_asignatura` ON `qrlean`.`asociacion_asignaturas_fichas` (`id_asignatura` ASC) ;

CREATE INDEX `id_instructor` ON `qrlean`.`asociacion_asignaturas_fichas` (`id_instructor` ASC) ;


-- -----------------------------------------------------
-- Table `qrlean`.`clase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`clase` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`clase` (
  `id_clase` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de la clase,su tipo de dato es INT y no puede ser null',
  `nombre_clase` VARCHAR(30) NOT NULL comment 'Campo correspondiente al nombre de la clase, su tipo de dato es varchar con un maximo de 30 caracteres y no puede ser null.',
  `dia` DATE NOT NULL comment 'Campo correspondiente al dia (fecha) de la clase, su tipo de dato es DATE y no puede ser null.',
  `hora_inicio` TIME NOT NULL comment 'Campo correspondiente a la hora de inicio de la clase, su tipo de dato es TIME y no puede ser null.',
  `hora_final` TIME NOT NULL comment 'Campo correspondiente a la hora de final de la clase, su tipo de dato es TIME y no puede ser null.',
  `id_asociacion_asignatura_ficha` INT(11) NOT NULL comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Asociacion_asignaturas campo id_asociacion_asignatura,su tipo de dato es INT y no puede ser null',
  PRIMARY KEY (`id_clase`, `id_asociacion_asignatura_ficha`),
  CONSTRAINT `clase_ibfk_1`
    FOREIGN KEY (`id_asociacion_asignatura_ficha`)
    REFERENCES `qrlean`.`asociacion_asignaturas_fichas` (`id_asociacion_asignatura_ficha`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `id_asociacion_asignatura_ficha` ON `qrlean`.`clase` (`id_asociacion_asignatura_ficha` ASC) ;


-- -----------------------------------------------------
-- Table `qrlean`.`tipo_asistencias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`tipo_asistencias` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`tipo_asistencias` (
  `id_tipo_asistencia` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de los tipos de asistencia,su tipo de dato es INT y no puede ser null' ,
  `nombre_tipo_asistencia` VARCHAR(25) NOT NULL comment 'Campo correspondiente al nombre del tipo de asistencia, su tipo de dato es varchar con un maximo de 25 caracteres y no puede ser null.',
  PRIMARY KEY (`id_tipo_asistencia`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `qrlean`.`asistencias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`asistencias` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`asistencias` (
  `id_asistencia` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de la asistencia,su tipo de dato es INT y no puede ser null',
  `hora_firmada` DATETIME NOT NULL comment 'Campo correspondiente a la hora la cual fue creado el registro, su tipo de dato es TIMESTAMP y no puede ser null.',
  `id_clase` INT(11) NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
  `id_tipo_asistencia` INT(11) NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Tipo_asistencias campo id_tipo_asistencia,su tipo de dato es INT y no puede ser null',
  `id_aprendiz` INT(11) NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
  PRIMARY KEY (`id_asistencia`, `id_tipo_asistencia`, `id_aprendiz`, `id_clase`),
  CONSTRAINT `asistencias_ibfk_1`
    FOREIGN KEY (`id_clase`)
    REFERENCES `qrlean`.`clase` (`id_clase`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `asistencias_ibfk_2`
    FOREIGN KEY (`id_tipo_asistencia`)
    REFERENCES `qrlean`.`tipo_asistencias` (`id_tipo_asistencia`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `asistencias_ibfk_3`
    FOREIGN KEY (`id_aprendiz`)
    REFERENCES `qrlean`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `id_clase` ON `qrlean`.`asistencias` (`id_clase` ASC) ;

CREATE INDEX `id_tipo_asistencia` ON `qrlean`.`asistencias` (`id_tipo_asistencia` ASC) ;

CREATE INDEX `id_aprendiz` ON `qrlean`.`asistencias` (`id_aprendiz` ASC) ;


-- -----------------------------------------------------
-- Table `qrlean`.`asociacion_usuarios_fichas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`asociacion_usuarios_fichas` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`asociacion_usuarios_fichas` (
  `id_asociacion_usuario_ficha` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de la asociacion entre usuaros y fichas,su tipo de dato es INT y no puede ser null',
  `id_ficha` INT(11) NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ficha campo id_ficha,su tipo de dato es INT y no puede ser null',
  `id_usuario` INT(11) NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
  PRIMARY KEY (`id_asociacion_usuario_ficha`, `id_usuario`, `id_ficha`),
  CONSTRAINT `asociacion_usuarios_fichas_ibfk_1`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `qrlean`.`fichas` (`id_ficha`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `asociacion_usuarios_fichas_ibfk_2`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `qrlean`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE UNIQUE INDEX `asociacion_usuarios_fichas_id_usuario_id_ficha_unique` ON `qrlean`.`asociacion_usuarios_fichas` (`id_ficha` ASC, `id_usuario` ASC) ;

CREATE INDEX `id_usuario` ON `qrlean`.`asociacion_usuarios_fichas` (`id_usuario` ASC) ;


-- -----------------------------------------------------
-- Table `qrlean`.`solicitudes_cambio_asistencia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qrlean`.`solicitudes_cambio_asistencia` ;

CREATE TABLE IF NOT EXISTS `qrlean`.`solicitudes_cambio_asistencia` (
  `id_solicitudes_cambio_asistencia` INT(11) NOT NULL AUTO_INCREMENT comment 'Campo correspondiente a la clave primaria de la solicitud de cambio de asistencia,su tipo de dato es INT y no puede ser null',
  `asunto` VARCHAR(50) NOT NULL comment 'Campo correspondiente al asunto de la solicitud de cambio de asistencia, su tipo de dato es varchar con un maximo de 50 caracteres y no puede ser null.',
  `contenido` TEXT NOT NULL comment 'Campo correspondiente al contenido de la solicitud de cambio de asistencia, su tipo de dato es TEXT y no puede ser null.',
  `id_aprendiz` INT(11) NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
  `id_instructor` INT(11) NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Usuarios campo id_usuario,su tipo de dato es INT y no puede ser null',
  `id_ficha` INT(11) NOT NULL  comment 'Campo correspondiente a la clave foranea la cual referencia a la clave primaria que se encuentra en la tabla Ficha campo id_ficha,su tipo de dato es INT y no puede ser null',
  PRIMARY KEY (`id_solicitudes_cambio_asistencia`, `id_instructor`, `id_aprendiz`, `id_ficha`),
  CONSTRAINT `solicitudes_cambio_asistencia_ibfk_1`
    FOREIGN KEY (`id_aprendiz`)
    REFERENCES `qrlean`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `solicitudes_cambio_asistencia_ibfk_2`
    FOREIGN KEY (`id_instructor`)
    REFERENCES `qrlean`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `solicitudes_cambio_asistencia_ibfk_3`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `qrlean`.`fichas` (`id_ficha`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `id_aprendiz` ON `qrlean`.`solicitudes_cambio_asistencia` (`id_aprendiz` ASC) ;

CREATE INDEX `id_instructor` ON `qrlean`.`solicitudes_cambio_asistencia` (`id_instructor` ASC) ;

CREATE INDEX `id_ficha` ON `qrlean`.`solicitudes_cambio_asistencia` (`id_ficha` ASC) ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

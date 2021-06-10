-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2021 a las 00:04:03
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `qrlean`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
  `id_asignatura` int(11) NOT NULL,
  `nombre_asignatura` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id_asistencia` int(11) NOT NULL,
  `hora_firmada` datetime NOT NULL,
  `id_clase` int(11) NOT NULL,
  `id_tipo_asistencia` int(11) NOT NULL,
  `id_aprendiz` int(11) NOT NULL,
  `id_solicitud_cambio_asistencia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asociacion_asignaturas_fichas`
--

CREATE TABLE `asociacion_asignaturas_fichas` (
  `id_asociacion_asignatura_ficha` int(11) NOT NULL,
  `id_ficha` int(11) NOT NULL,
  `id_asignatura` int(11) NOT NULL,
  `id_instructor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asociacion_usuarios_fichas`
--

CREATE TABLE `asociacion_usuarios_fichas` (
  `id_asociacion_usuario_ficha` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ficha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudad` int(11) NOT NULL,
  `nombre_ciudad` varchar(30) DEFAULT NULL,
  `id_departamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `id_clase` int(11) NOT NULL,
  `nombre_clase` varchar(30) NOT NULL,
  `dia` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_final` time NOT NULL,
  `permite_qr` tinyint(1) NOT NULL,
  `id_asociacion_asignatura_ficha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `id_departamento` int(11) NOT NULL,
  `nombre_departamento` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas`
--

CREATE TABLE `fichas` (
  `id_ficha` int(11) NOT NULL,
  `id_programa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programas`
--

CREATE TABLE `programas` (
  `id_programa` int(11) NOT NULL,
  `nombre_programa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('00000001-qrleanMigration.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemetamigrations`
--

CREATE TABLE `sequelizemetamigrations` (
  `revision` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `state` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`state`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sequelizemetamigrations`
--

INSERT INTO `sequelizemetamigrations` (`revision`, `name`, `state`) VALUES
(1, 'qrleanMigration', '{\"revision\":1,\"tables\":{\"Tipo_estados_solicitudes\":{\"tableName\":\"Tipo_estados_solicitudes\",\"schema\":{\"id_estado\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true},\"nombre_estado\":{\"seqType\":\"Sequelize.STRING\",\"allowNull\":false}},\"indexes\":{}},\"Usuarios\":{\"tableName\":\"Usuarios\",\"schema\":{\"id_usuario\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombres_usuario\":{\"seqType\":\"Sequelize.STRING(30)\",\"allowNull\":false},\"apellidos_usuario\":{\"seqType\":\"Sequelize.STRING(30)\",\"allowNull\":false},\"numero_documento\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"unique\":true},\"password\":{\"seqType\":\"Sequelize.STRING(150)\",\"allowNull\":false},\"emailInstitucional\":{\"seqType\":\"Sequelize.STRING(100)\",\"allowNull\":false,\"unique\":true},\"direccion_residencial\":{\"seqType\":\"Sequelize.STRING(60)\",\"allowNull\":true},\"telefono_movil\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":true},\"id_ciudad\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Ciudades\",\"key\":\"id_ciudad\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"NO ACTION\"},\"id_tipo_rol\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Tipo_roles\",\"key\":\"id_tipo_rol\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"NO ACTION\"},\"id_tipo_documento\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Tipo_documentos\",\"key\":\"id_tipo_documento\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"NO ACTION\"}},\"indexes\":{}},\"Departamentos\":{\"tableName\":\"Departamentos\",\"schema\":{\"id_departamento\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombre_departamento\":{\"seqType\":\"Sequelize.STRING(30)\",\"allowNull\":false}},\"indexes\":{}},\"Ciudades\":{\"tableName\":\"Ciudades\",\"schema\":{\"id_ciudad\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombre_ciudad\":{\"seqType\":\"Sequelize.STRING(30)\"},\"id_departamento\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Departamentos\",\"key\":\"id_departamento\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"}},\"indexes\":{}},\"Tipo_roles\":{\"tableName\":\"Tipo_roles\",\"schema\":{\"id_tipo_rol\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombre_rol\":{\"seqType\":\"Sequelize.STRING(20)\",\"allowNull\":false}},\"indexes\":{}},\"Tipo_documentos\":{\"tableName\":\"Tipo_documentos\",\"schema\":{\"id_tipo_documento\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombre_documento\":{\"seqType\":\"Sequelize.STRING\",\"allowNull\":false}},\"indexes\":{}},\"Fichas\":{\"tableName\":\"Fichas\",\"schema\":{\"id_ficha\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"id_programa\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Programas\",\"key\":\"id_programa\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"NO ACTION\"}},\"indexes\":{}},\"Asociacion_usuarios_fichas\":{\"tableName\":\"Asociacion_usuarios_fichas\",\"schema\":{\"id_asociacion_usuario_ficha\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"id_usuario\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"unique\":\"Asociacion_usuarios_fichas_id_ficha_id_usuario_unique\",\"references\":{\"model\":\"Usuarios\",\"key\":\"id_usuario\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"},\"id_ficha\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"unique\":\"Asociacion_usuarios_fichas_id_ficha_id_usuario_unique\",\"references\":{\"model\":\"Fichas\",\"key\":\"id_ficha\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"}},\"indexes\":{}},\"Programas\":{\"tableName\":\"Programas\",\"schema\":{\"id_programa\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombre_programa\":{\"seqType\":\"Sequelize.STRING(100)\",\"allowNull\":false}},\"indexes\":{}},\"Solicitudes_cambio_asistencia\":{\"tableName\":\"Solicitudes_cambio_asistencia\",\"schema\":{\"id_solicitud_cambio_asistencia\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"asunto\":{\"seqType\":\"Sequelize.STRING(50)\",\"allowNull\":false},\"contenido\":{\"seqType\":\"Sequelize.TEXT\",\"allowNull\":false},\"id_aprendiz\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Asociacion_usuarios_fichas\",\"key\":\"id_asociacion_usuario_ficha\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"},\"id_instructor\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Asociacion_usuarios_fichas\",\"key\":\"id_asociacion_usuario_ficha\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"},\"id_ficha\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Fichas\",\"key\":\"id_ficha\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"},\"id_estado\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Tipo_estados_solicitudes\",\"key\":\"id_estado\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"}},\"indexes\":{}},\"Asignaturas\":{\"tableName\":\"Asignaturas\",\"schema\":{\"id_asignatura\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombre_asignatura\":{\"seqType\":\"Sequelize.STRING(100)\",\"allowNull\":false}},\"indexes\":{}},\"Asociacion_asignaturas_fichas\":{\"tableName\":\"Asociacion_asignaturas_fichas\",\"schema\":{\"id_asociacion_asignatura_ficha\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"id_ficha\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"unique\":\"Asociacion_asignaturas_fichas_id_asignatura_id_ficha_unique\",\"references\":{\"model\":\"Fichas\",\"key\":\"id_ficha\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"},\"id_asignatura\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"unique\":\"Asociacion_asignaturas_fichas_id_asignatura_id_ficha_unique\",\"references\":{\"model\":\"Asignaturas\",\"key\":\"id_asignatura\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"},\"id_instructor\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Asociacion_usuarios_fichas\",\"key\":\"id_asociacion_usuario_ficha\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"}},\"indexes\":{}},\"Clases\":{\"tableName\":\"Clases\",\"schema\":{\"id_clase\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombre_clase\":{\"seqType\":\"Sequelize.STRING(30)\",\"allowNull\":false},\"dia\":{\"seqType\":\"Sequelize.DATEONLY\",\"allowNull\":false},\"hora_inicio\":{\"seqType\":\"Sequelize.TIME\",\"allowNull\":false},\"hora_final\":{\"seqType\":\"Sequelize.TIME\",\"allowNull\":false},\"permite_qr\":{\"seqType\":\"Sequelize.BOOLEAN\",\"allowNull\":false},\"id_asociacion_asignatura_ficha\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Asociacion_asignaturas_fichas\",\"key\":\"id_asociacion_asignatura_ficha\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"}},\"indexes\":{}},\"Asistencias\":{\"tableName\":\"Asistencias\",\"schema\":{\"id_asistencia\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"hora_firmada\":{\"seqType\":\"Sequelize.DATE\",\"allowNull\":false},\"id_clase\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Clases\",\"key\":\"id_clase\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"CASCADE\"},\"id_tipo_asistencia\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Tipo_asistencias\",\"key\":\"id_tipo_asistencia\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"NO ACTION\"},\"id_aprendiz\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"references\":{\"model\":\"Asociacion_usuarios_fichas\",\"key\":\"id_asociacion_usuario_ficha\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"NO ACTION\"},\"id_solicitud_cambio_asistencia\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":true,\"references\":{\"model\":\"Solicitudes_cambio_asistencia\",\"key\":\"id_solicitud_cambio_asistencia\"},\"onUpdate\":\"CASCADE\",\"onDelete\":\"SET NULL\"}},\"indexes\":{}},\"Tipo_asistencias\":{\"tableName\":\"Tipo_asistencias\",\"schema\":{\"id_tipo_asistencia\":{\"seqType\":\"Sequelize.INTEGER\",\"allowNull\":false,\"primaryKey\":true,\"autoIncrement\":true},\"nombre_tipo_asistencia\":{\"seqType\":\"Sequelize.STRING(25)\",\"allowNull\":false}},\"indexes\":{}}}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_cambio_asistencia`
--

CREATE TABLE `solicitudes_cambio_asistencia` (
  `id_solicitud_cambio_asistencia` int(11) NOT NULL,
  `asunto` varchar(50) NOT NULL,
  `contenido` text NOT NULL,
  `id_aprendiz` int(11) NOT NULL,
  `id_instructor` int(11) NOT NULL,
  `id_ficha` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_asistencias`
--

CREATE TABLE `tipo_asistencias` (
  `id_tipo_asistencia` int(11) NOT NULL,
  `nombre_tipo_asistencia` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documentos`
--

CREATE TABLE `tipo_documentos` (
  `id_tipo_documento` int(11) NOT NULL,
  `nombre_documento` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_estados_solicitudes`
--

CREATE TABLE `tipo_estados_solicitudes` (
  `id_estado` int(11) NOT NULL,
  `nombre_estado` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_roles`
--

CREATE TABLE `tipo_roles` (
  `id_tipo_rol` int(11) NOT NULL,
  `nombre_rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres_usuario` varchar(30) NOT NULL,
  `apellidos_usuario` varchar(30) NOT NULL,
  `numero_documento` int(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  `emailInstitucional` varchar(100) NOT NULL,
  `direccion_residencial` varchar(60) DEFAULT NULL,
  `telefono_movil` int(11) DEFAULT NULL,
  `id_ciudad` int(11) NOT NULL,
  `id_tipo_rol` int(11) NOT NULL,
  `id_tipo_documento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD PRIMARY KEY (`id_asignatura`);

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `id_clase` (`id_clase`),
  ADD KEY `id_tipo_asistencia` (`id_tipo_asistencia`),
  ADD KEY `id_aprendiz` (`id_aprendiz`),
  ADD KEY `id_solicitud_cambio_asistencia` (`id_solicitud_cambio_asistencia`);

--
-- Indices de la tabla `asociacion_asignaturas_fichas`
--
ALTER TABLE `asociacion_asignaturas_fichas`
  ADD PRIMARY KEY (`id_asociacion_asignatura_ficha`),
  ADD KEY `id_ficha` (`id_ficha`),
  ADD KEY `id_asignatura` (`id_asignatura`),
  ADD KEY `id_instructor` (`id_instructor`);

--
-- Indices de la tabla `asociacion_usuarios_fichas`
--
ALTER TABLE `asociacion_usuarios_fichas`
  ADD PRIMARY KEY (`id_asociacion_usuario_ficha`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ficha` (`id_ficha`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD KEY `id_departamento` (`id_departamento`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`id_clase`),
  ADD KEY `id_asociacion_asignatura_ficha` (`id_asociacion_asignatura_ficha`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id_departamento`);

--
-- Indices de la tabla `fichas`
--
ALTER TABLE `fichas`
  ADD PRIMARY KEY (`id_ficha`),
  ADD KEY `id_programa` (`id_programa`);

--
-- Indices de la tabla `programas`
--
ALTER TABLE `programas`
  ADD PRIMARY KEY (`id_programa`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `sequelizemetamigrations`
--
ALTER TABLE `sequelizemetamigrations`
  ADD PRIMARY KEY (`revision`),
  ADD UNIQUE KEY `revision` (`revision`);

--
-- Indices de la tabla `solicitudes_cambio_asistencia`
--
ALTER TABLE `solicitudes_cambio_asistencia`
  ADD PRIMARY KEY (`id_solicitud_cambio_asistencia`),
  ADD KEY `id_aprendiz` (`id_aprendiz`),
  ADD KEY `id_instructor` (`id_instructor`),
  ADD KEY `id_ficha` (`id_ficha`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `tipo_asistencias`
--
ALTER TABLE `tipo_asistencias`
  ADD PRIMARY KEY (`id_tipo_asistencia`);

--
-- Indices de la tabla `tipo_documentos`
--
ALTER TABLE `tipo_documentos`
  ADD PRIMARY KEY (`id_tipo_documento`);

--
-- Indices de la tabla `tipo_estados_solicitudes`
--
ALTER TABLE `tipo_estados_solicitudes`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `tipo_roles`
--
ALTER TABLE `tipo_roles`
  ADD PRIMARY KEY (`id_tipo_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `numero_documento` (`numero_documento`),
  ADD UNIQUE KEY `emailInstitucional` (`emailInstitucional`),
  ADD KEY `id_ciudad` (`id_ciudad`),
  ADD KEY `id_tipo_rol` (`id_tipo_rol`),
  ADD KEY `id_tipo_documento` (`id_tipo_documento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  MODIFY `id_asignatura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `asociacion_asignaturas_fichas`
--
ALTER TABLE `asociacion_asignaturas_fichas`
  MODIFY `id_asociacion_asignatura_ficha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `asociacion_usuarios_fichas`
--
ALTER TABLE `asociacion_usuarios_fichas`
  MODIFY `id_asociacion_usuario_ficha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id_clase` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fichas`
--
ALTER TABLE `fichas`
  MODIFY `id_ficha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `programas`
--
ALTER TABLE `programas`
  MODIFY `id_programa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes_cambio_asistencia`
--
ALTER TABLE `solicitudes_cambio_asistencia`
  MODIFY `id_solicitud_cambio_asistencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_asistencias`
--
ALTER TABLE `tipo_asistencias`
  MODIFY `id_tipo_asistencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_documentos`
--
ALTER TABLE `tipo_documentos`
  MODIFY `id_tipo_documento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_roles`
--
ALTER TABLE `tipo_roles`
  MODIFY `id_tipo_rol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`id_clase`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`id_tipo_asistencia`) REFERENCES `tipo_asistencias` (`id_tipo_asistencia`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `asistencias_ibfk_3` FOREIGN KEY (`id_aprendiz`) REFERENCES `asociacion_usuarios_fichas` (`id_asociacion_usuario_ficha`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `asistencias_ibfk_4` FOREIGN KEY (`id_solicitud_cambio_asistencia`) REFERENCES `solicitudes_cambio_asistencia` (`id_solicitud_cambio_asistencia`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `asociacion_asignaturas_fichas`
--
ALTER TABLE `asociacion_asignaturas_fichas`
  ADD CONSTRAINT `asociacion_asignaturas_fichas_ibfk_1` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asociacion_asignaturas_fichas_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asociacion_asignaturas_fichas_ibfk_3` FOREIGN KEY (`id_instructor`) REFERENCES `asociacion_usuarios_fichas` (`id_asociacion_usuario_ficha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asociacion_usuarios_fichas`
--
ALTER TABLE `asociacion_usuarios_fichas`
  ADD CONSTRAINT `asociacion_usuarios_fichas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asociacion_usuarios_fichas_ibfk_2` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`id_asociacion_asignatura_ficha`) REFERENCES `asociacion_asignaturas_fichas` (`id_asociacion_asignatura_ficha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `fichas`
--
ALTER TABLE `fichas`
  ADD CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_programa`) REFERENCES `programas` (`id_programa`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudes_cambio_asistencia`
--
ALTER TABLE `solicitudes_cambio_asistencia`
  ADD CONSTRAINT `solicitudes_cambio_asistencia_ibfk_1` FOREIGN KEY (`id_aprendiz`) REFERENCES `asociacion_usuarios_fichas` (`id_asociacion_usuario_ficha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudes_cambio_asistencia_ibfk_2` FOREIGN KEY (`id_instructor`) REFERENCES `asociacion_usuarios_fichas` (`id_asociacion_usuario_ficha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudes_cambio_asistencia_ibfk_3` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudes_cambio_asistencia_ibfk_4` FOREIGN KEY (`id_estado`) REFERENCES `tipo_estados_solicitudes` (`id_estado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_tipo_rol`) REFERENCES `tipo_roles` (`id_tipo_rol`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documentos` (`id_tipo_documento`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

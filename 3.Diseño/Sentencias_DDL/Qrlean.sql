-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2021 a las 20:00:03
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

--
-- Volcado de datos para la tabla `asignaturas`
--

INSERT INTO `asignaturas` (`id_asignatura`, `nombre_asignatura`) VALUES
(1, 'Inducción al sena'),
(2, 'Ética'),
(3, 'Comunicación'),
(4, 'Resolución de problemas'),
(5, 'Actividad física'),
(6, 'Matemáticas'),
(7, 'Ciencias naturales'),
(8, 'Dimensión ambiental'),
(9, 'Salud ocupacional');

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

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudad`, `nombre_ciudad`, `id_departamento`) VALUES
(1, 'Bogotá', 15),
(2, 'Medellín', 2),
(3, 'Santiago de Cali', 31),
(4, 'Barranquilla', 4),
(5, 'Cartagena', 5),
(6, 'San Jose de Cucuta', 23),
(7, 'Bucaramanga', 28),
(8, 'Soledad', 4),
(9, 'Ibagué', 30),
(10, 'Soacha', 14),
(11, 'Pereira', 26),
(12, 'Santa_Marta', 20),
(13, 'Villavicencio', 21),
(14, 'Bello', 2),
(15, 'Valledupar', 11),
(16, 'Pasto', 22),
(17, 'Buenaventuta', 31),
(18, 'Montería', 13),
(19, 'Manizales', 7);

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

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`id_departamento`, `nombre_departamento`) VALUES
(1, 'Amazonas'),
(2, 'Amazonas'),
(3, 'Antioquia'),
(4, 'Arauca'),
(5, 'Atlántico'),
(6, 'Bolívar'),
(7, 'Boyacá'),
(8, 'Caldas'),
(9, 'Caquetá'),
(10, 'Casanare'),
(11, 'Cauca'),
(12, 'Cesar'),
(13, 'Chocó'),
(14, 'Córdoba'),
(15, 'Cundinamarca'),
(16, 'Distrito Capital'),
(17, 'Guainía'),
(18, 'Guaviare'),
(19, 'Huila'),
(20, 'Guajira'),
(21, 'Magdalena'),
(22, 'Meta'),
(23, 'Nariño'),
(24, 'Norte Santander'),
(25, 'Putumayo'),
(26, 'Quindío'),
(27, 'Risaralda'),
(28, 'San Andrés'),
(29, 'Santander'),
(30, 'Sucre'),
(31, 'Tolima'),
(32, 'Valle'),
(33, 'Vaupés'),
(34, 'Vichada');

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

--
-- Volcado de datos para la tabla `programas`
--

INSERT INTO `programas` (`id_programa`, `nombre_programa`) VALUES
(1, 'Actividad física'),
(2, 'Actuación'),
(3, 'Agricultura de precisión'),
(4, 'Agrobiotecnología'),
(5, 'Agroindustria alimentaria'),
(6, 'Agroindustria panelera'),
(7, 'Agua y saneamiento'),
(8, 'Alistamiento de laboratorios de análisis y ensayos para la industria'),
(9, 'Almacenamiento, empaque y embalaje de objetos'),
(10, 'Almacenamiento, empaque y embalaje de objetos'),
(11, 'Análisis y desarrollo de sistemas de información'),
(12, 'Animación 3d'),
(13, 'Animación digital'),
(14, 'Análisis de materiales para la industria'),
(15, 'Análisis de muestras químicas'),
(16, 'Apoyo administrativo en salud'),
(17, 'Apoyo logístico en eventos y servicios empresariales'),
(18, 'Aprovechamiento y beneficio del cultivo del caucho natural'),
(19, 'Artesanías tradicionales en tejido de punto'),
(20, 'Aseguramiento de la calidad del café en la finca'),
(21, 'Aseguramiento metrológico industrial'),
(22, 'Asesoría comercial'),
(23, 'Asesoría comercial y operaciones de entidades financieras'),
(24, 'Asistencia administrativa'),
(25, 'Ejecución de programas deportivos'),
(26, 'Ejecución musical con instrumentos funcionales'),
(27, 'El riesgo crediticio y su administración'),
(28, 'Elaboración de prendas de vestir sobre medidas'),
(29, 'Elaboración de productos de confitería'),
(30, 'Impresión digital'),
(31, 'Asistencia en la función pública'),
(32, 'Asistencia en organización de archivos'),
(33, 'Atención integral a la primera infancia'),
(34, 'Agroindustria alimentaria al paciente domiciliario'),
(35, 'Atención prehospitalaria'),
(36, 'Automatización industrial'),
(37, 'Bilingual expert on business process outsourcing'),
(38, 'Carpintería'),
(39, 'Carpintería metálica'),
(40, 'Carpintero instalador'),
(41, 'Carpintería de aluminio'),
(42, 'Catastro'),
(43, 'Cocina'),
(44, 'Comercialización de alimentos'),
(45, 'Comercialización de productos masivos'),
(46, 'Comercio internacional'),
(47, 'Compras y suministros'),
(48, 'Comunicación comercial'),
(49, 'Confección industrial de ropa deportiva'),
(50, 'Confección industrial de ropa exterior'),
(51, 'Asesoría comercial'),
(52, 'Confección industrial'),
(53, 'Conservación de recursos naturales'),
(54, 'Construcción de estructuras en concreto'),
(55, 'Construcción de redes de acueducto y alcantarillado'),
(56, 'Construcción y montaje de instalaciones eléctricas'),
(57, 'Construcciones en madera'),
(58, 'Construcciones livianas en seco'),
(59, 'Construcción de edificaciones'),
(60, 'Construcción de estructuras en concreto'),
(61, 'Construcción de vías'),
(62, 'Contabilidad y finanzas'),
(63, 'Elaboración de audiovisuales'),
(64, 'Elaboración de objetos artesanales con semillas y maderables'),
(65, 'Contabilización de operaciones comerciales y financieras'),
(66, 'Control de calidad de alimentos'),
(67, 'Control de calidad en confección industrial'),
(68, 'Control de calidad en confección'),
(69, 'Control de movilidad transporte y seguridad vial'),
(70, 'Coordinación de escuelas de música'),
(71, 'Corte y venta de carnes'),
(72, 'Cosmetología y estética integral'),
(73, 'Cría y levante de pollitas'),
(74, 'Cuidado estético de manos y pies'),
(75, 'Cultivo y cosecha de palma de aceite'),
(76, 'Cultivos agrícolas'),
(77, 'Decoración de espacios interiores'),
(78, 'Desarrollo de aplicaciones para dispositivos móviles'),
(79, 'Desarrollo de operaciones logística en la cadena de abastecimiento'),
(80, 'Desarrollo de videojuegos'),
(81, 'Diagnóstico y análisis organizacional para unidades productivas'),
(82, 'Dibujo arquitectónico'),
(83, 'Dibujo mecánico'),
(84, 'Dirección de ventas'),
(85, 'Diseño de componentes para calzado'),
(86, 'Diseño de elementos mecánicos para su fabricación con máquinas herramientas cnc'),
(87, 'Diseño de videojuegos'),
(88, 'Diseño e integración de multimedia'),
(89, 'Diseño e integración de automatismos mecatrónicos'),
(90, 'Diseño y desarrollo de investigaciones de mercado'),
(91, 'Ebanistería'),
(92, 'Ejecución de clases grupales orientadas al fitness'),
(93, 'Ejecución de eventos deportivos y recreativos'),
(94, 'Ejecución de la danza');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('00000001-qrleanMigration.js');

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

--
-- Volcado de datos para la tabla `tipo_asistencias`
--

INSERT INTO `tipo_asistencias` (`id_tipo_asistencia`, `nombre_tipo_asistencia`) VALUES
(1, 'Asistió.'),
(2, 'No asistió.'),
(3, 'Asistió con retardo.'),
(4, 'Asistió con excusa.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documentos`
--

CREATE TABLE `tipo_documentos` (
  `id_tipo_documento` int(11) NOT NULL,
  `nombre_documento` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_documentos`
--

INSERT INTO `tipo_documentos` (`id_tipo_documento`, `nombre_documento`) VALUES
(1, 'Cedula de ciudadanía.'),
(2, 'Tarjeta de identidad.'),
(3, 'Cedula de extranjería.'),
(4, 'Pasaporte.');

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

--
-- Volcado de datos para la tabla `tipo_roles`
--

INSERT INTO `tipo_roles` (`id_tipo_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Instructor'),
(3, 'Aprendiz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres_usuario` varchar(30) NOT NULL,
  `apellidos_usuario` varchar(30) NOT NULL,
  `numero_documento` bigint(20) NOT NULL,
  `password` varchar(150) NOT NULL,
  `emailInstitucional` varchar(100) NOT NULL,
  `direccion_residencial` varchar(60) DEFAULT NULL,
  `telefono_movil` bigint(20) DEFAULT NULL,
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
  MODIFY `id_asignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `id_ciudad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id_clase` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `fichas`
--
ALTER TABLE `fichas`
  MODIFY `id_ficha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `programas`
--
ALTER TABLE `programas`
  MODIFY `id_programa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de la tabla `solicitudes_cambio_asistencia`
--
ALTER TABLE `solicitudes_cambio_asistencia`
  MODIFY `id_solicitud_cambio_asistencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_asistencias`
--
ALTER TABLE `tipo_asistencias`
  MODIFY `id_tipo_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_documentos`
--
ALTER TABLE `tipo_documentos`
  MODIFY `id_tipo_documento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_roles`
--
ALTER TABLE `tipo_roles`
  MODIFY `id_tipo_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `asistencias_ibfk_3` FOREIGN KEY (`id_aprendiz`) REFERENCES `asociacion_usuarios_fichas` (`id_asociacion_usuario_ficha`) ON DELETE CASCADE ON UPDATE CASCADE,
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

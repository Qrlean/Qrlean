-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 25-06-2020 a las 15:54:44
-- Versión del servidor: 10.3.23-MariaDB-cll-lve
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mpmdmiia_appliedmemoryweb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activo`
--

CREATE TABLE `activo` (
  `id` bigint(20) NOT NULL,
  `Tipo_Activo` int(11) NOT NULL,
  `Estado_Activo` int(11) NOT NULL,
  `Fecha_Ingreso` date NOT NULL,
  `Fecha_de_Baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `activo`
--

INSERT INTO `activo` (`id`, `Tipo_Activo`, `Estado_Activo`, `Fecha_Ingreso`, `Fecha_de_Baja`) VALUES
(1, 1, 1, '2020-06-14', NULL),
(2, 2, 1, '2020-06-24', NULL),
(3, 3, 1, '2020-06-24', NULL),
(4, 3, 1, '2020-06-24', NULL),
(5, 1, 1, '2020-06-24', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ambiente`
--

CREATE TABLE `ambiente` (
  `Num_Ambiente` int(11) NOT NULL,
  `Nombre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ambiente`
--

INSERT INTO `ambiente` (`Num_Ambiente`, `Nombre`) VALUES
(201, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `id_chat` int(11) NOT NULL,
  `CC_Instructor` bigint(11) NOT NULL,
  `Id_Reporte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `chats`
--

INSERT INTO `chats` (`id_chat`, `CC_Instructor`, `Id_Reporte`) VALUES
(1, 102, 1),
(2, 102, 2),
(3, 102, 3),
(5, 102, 5),
(6, 102, 6),
(7, 102, 7),
(8, 102, 8),
(9, 102, 9),
(11, 102, 9),
(12, 102, 9),
(13, 102, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `CC` bigint(11) NOT NULL,
  `Nombres` varchar(30) NOT NULL,
  `Apellidos` varchar(30) NOT NULL,
  `TipoDoc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`CC`, `Nombres`, `Apellidos`, `TipoDoc`) VALUES
(101, 'robert', 'leonardo', 1),
(102, 'juan pablo', 'Sanchez Rojas', 1),
(1000352694, 'Dylan Sneider', 'Sanchez Rojas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoactivo`
--

CREATE TABLE `estadoactivo` (
  `IdEstado` int(11) NOT NULL,
  `NombreEstado` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estadoactivo`
--

INSERT INTO `estadoactivo` (`IdEstado`, `NombreEstado`) VALUES
(1, 'Bueno'),
(2, 'Fallas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoonline`
--

CREATE TABLE `estadoonline` (
  `IdEstado` int(11) NOT NULL,
  `Estado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estadoonline`
--

INSERT INTO `estadoonline` (`IdEstado`, `Estado`) VALUES
(1, 'Online'),
(2, 'Offline');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadorerporte`
--

CREATE TABLE `estadorerporte` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estadorerporte`
--

INSERT INTO `estadorerporte` (`Id`, `Nombre`) VALUES
(1, 'Solucionado'),
(2, 'Reportado'),
(3, 'En Solucion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hoja_vida_activo`
--

CREATE TABLE `hoja_vida_activo` (
  `id` bigint(20) NOT NULL,
  `IdActivo` bigint(20) NOT NULL,
  `Tipo_Accion` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Ambiente` int(11) DEFAULT NULL,
  `CC_Persona` int(11) DEFAULT NULL,
  `CC_Tecnico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `hoja_vida_activo`
--

INSERT INTO `hoja_vida_activo` (`id`, `IdActivo`, `Tipo_Accion`, `Fecha`, `Ambiente`, `CC_Persona`, `CC_Tecnico`) VALUES
(1, 1, 1, '2020-06-14', NULL, NULL, 1000352694),
(2, 1, 2, '2020-06-24', 201, NULL, 1000352694),
(3, 2, 2, '2020-06-25', 201, NULL, 1000352694);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `IdMen` bigint(20) NOT NULL,
  `Mensaje` varchar(1000) NOT NULL,
  `CC_T` bigint(20) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `Id_Chat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`IdMen`, `Mensaje`, `CC_T`, `Fecha`, `Hora`, `Id_Chat`) VALUES
(1, 'umm', 1000352694, '2020-06-13', '14:36:23', 1),
(2, 'aqui si sirve', 1000352694, '2020-06-13', '15:23:34', 1),
(3, 'espera que estoy mirando si rive xd', 1000352694, '2020-06-13', '22:30:31', 1),
(4, 'despues', 102, '2020-06-13', '23:11:12', 2),
(5, 'si sirve que rico weon', 1000352694, '2020-06-13', '23:11:36', 2),
(6, 'si', 1023111, '2020-06-16', '17:56:35', 1),
(7, 'hola', 1023111, '2020-06-17', '08:17:15', 2),
(8, 're op', 1023111, '2020-06-17', '08:17:21', 2),
(9, 'cual 3', 102, '2020-06-17', '08:20:17', 1),
(10, 'gracias', 102, '2020-06-18', '01:57:06', 7),
(11, 'cada uno tiene su chat', 1000352694, '2020-06-24', '03:18:28', 7),
(12, 'diferente', 1000352694, '2020-06-24', '03:18:47', 3),
(13, 'hola como vas? ', 1000352694, '2020-06-24', '23:41:50', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `visto` int(11) NOT NULL,
  `CC` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `nombre`, `fecha`, `visto`, `CC`) VALUES
(18, 'Tu reporte 1 esta solucionado', '2020-06-18', 2, 102),
(21, 'NUEVO REPORTE', '2020-06-18', 2, NULL),
(22, 'NUEVO REPORTE', '2020-06-18', 2, NULL),
(23, 'NUEVO REPORTE', '2020-06-18', 2, NULL),
(24, 'Tu reporte #7 esta en solucion', '2020-06-18', 2, 102),
(25, 'NUEVO REPORTE', '2020-06-24', 2, NULL),
(26, 'NUEVO REPORTE', '2020-06-24', 2, NULL),
(27, 'Tu reporte #9 esta en solucion', '2020-06-24', 2, 102),
(28, 'Tu reporte #9 esta solucionado', '2020-06-24', 2, 102),
(29, 'Tu reporte #7 esta solucionado', '2020-06-25', 2, 102),
(30, 'Tu reporte #8 esta en solucion', '2020-06-25', 2, 102),
(31, 'Tu reporte #8 esta solucionado', '2020-06-25', 2, 102);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `IdReporte` int(11) NOT NULL,
  `TipoEquipo` int(11) NOT NULL,
  `Num_Equipo` int(11) NOT NULL,
  `Ambiente` int(11) NOT NULL,
  `falla` varchar(50) NOT NULL,
  `CC` bigint(20) NOT NULL,
  `Fecha` date NOT NULL,
  `EstadoReporte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reporte`
--

INSERT INTO `reporte` (`IdReporte`, `TipoEquipo`, `Num_Equipo`, `Ambiente`, `falla`, `CC`, `Fecha`, `EstadoReporte`) VALUES
(1, 1, 1, 101, 'nada', 102, '2020-06-13', 1),
(2, 1, 1, 101, 'nada', 102, '2020-06-14', 3),
(3, 2, 15, 110, 'nada', 102, '2020-06-18', 3),
(5, 3, 1, 101, 'nada', 102, '2020-06-18', 2),
(6, 2, 1, 110, 'nada', 102, '2020-06-18', 2),
(7, 3, 15, 101, 'nada', 102, '2020-06-18', 1),
(8, 3, 1, 110, 'nada', 102, '2020-06-24', 1),
(9, 3, 1, 110, 'nada', 102, '2020-06-24', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoactivo`
--

CREATE TABLE `tipoactivo` (
  `IdTipoActivo` int(11) NOT NULL,
  `Nombre` varchar(25) NOT NULL,
  `Imagen` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipoactivo`
--

INSERT INTO `tipoactivo` (`IdTipoActivo`, `Nombre`, `Imagen`) VALUES
(1, 'Monitor', 'Monitor.png'),
(2, 'Teclado', 'Teclado.png'),
(3, 'Mouse', 'Mouse.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipocuenta`
--

CREATE TABLE `tipocuenta` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipocuenta`
--

INSERT INTO `tipocuenta` (`Id`, `Nombre`) VALUES
(1, 'ADMINISTRADOR'),
(2, 'TECNICO'),
(3, 'INSTRUCTOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodo`
--

CREATE TABLE `tipodo` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Siglas` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipodo`
--

INSERT INTO `tipodo` (`id`, `Nombre`, `Siglas`) VALUES
(1, 'Cedula de Ciudadano', 'C.C'),
(2, 'Cedula de Extrangeria', 'C.E');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_modificacion`
--

CREATE TABLE `tipo_modificacion` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_modificacion`
--

INSERT INTO `tipo_modificacion` (`id`, `Nombre`) VALUES
(1, 'STOCK'),
(2, 'ASIGNADO '),
(3, 'PRESTAMO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(250) NOT NULL,
  `CC` bigint(15) NOT NULL,
  `TipoCuenta` int(11) NOT NULL,
  `EstadoO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `contrasena`, `CC`, `TipoCuenta`, `EstadoO`) VALUES
(3, 'dylan.sr2002@gmail.com', '4d8c5b542524279e1797252d3c6916af', 1000352694, 1, 2),
(5, 'juan123', '827ccb0eea8a706c4c34a16891f84e7b', 101, 2, 1),
(8, 'juan12345', '827ccb0eea8a706c4c34a16891f84e7b', 102, 3, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activo`
--
ALTER TABLE `activo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tipo_Activo` (`Tipo_Activo`),
  ADD KEY `Estado_Activo` (`Estado_Activo`);

--
-- Indices de la tabla `ambiente`
--
ALTER TABLE `ambiente`
  ADD PRIMARY KEY (`Num_Ambiente`);

--
-- Indices de la tabla `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `CC_Instructor` (`CC_Instructor`),
  ADD KEY `Id_Reporte` (`Id_Reporte`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`CC`),
  ADD KEY `TipoDoc` (`TipoDoc`);

--
-- Indices de la tabla `estadoactivo`
--
ALTER TABLE `estadoactivo`
  ADD PRIMARY KEY (`IdEstado`);

--
-- Indices de la tabla `estadoonline`
--
ALTER TABLE `estadoonline`
  ADD PRIMARY KEY (`IdEstado`);

--
-- Indices de la tabla `estadorerporte`
--
ALTER TABLE `estadorerporte`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `hoja_vida_activo`
--
ALTER TABLE `hoja_vida_activo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tipo_Accion` (`Tipo_Accion`),
  ADD KEY `IdActivo` (`IdActivo`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`IdMen`),
  ADD KEY `Id_Chat` (`Id_Chat`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CC` (`CC`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`IdReporte`),
  ADD KEY `TipoEquipo` (`TipoEquipo`),
  ADD KEY `CC` (`CC`),
  ADD KEY `EstadoReporte` (`EstadoReporte`);

--
-- Indices de la tabla `tipoactivo`
--
ALTER TABLE `tipoactivo`
  ADD PRIMARY KEY (`IdTipoActivo`);

--
-- Indices de la tabla `tipocuenta`
--
ALTER TABLE `tipocuenta`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `tipodo`
--
ALTER TABLE `tipodo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_modificacion`
--
ALTER TABLE `tipo_modificacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TipoCuenta` (`TipoCuenta`),
  ADD KEY `EstadoO` (`EstadoO`),
  ADD KEY `CC` (`CC`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chats`
--
ALTER TABLE `chats`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `estadoactivo`
--
ALTER TABLE `estadoactivo`
  MODIFY `IdEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estadorerporte`
--
ALTER TABLE `estadorerporte`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `hoja_vida_activo`
--
ALTER TABLE `hoja_vida_activo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `IdMen` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `IdReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tipoactivo`
--
ALTER TABLE `tipoactivo`
  MODIFY `IdTipoActivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipocuenta`
--
ALTER TABLE `tipocuenta`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipodo`
--
ALTER TABLE `tipodo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `activo`
--
ALTER TABLE `activo`
  ADD CONSTRAINT `activo_ibfk_1` FOREIGN KEY (`Tipo_Activo`) REFERENCES `tipoactivo` (`IdTipoActivo`),
  ADD CONSTRAINT `activo_ibfk_2` FOREIGN KEY (`Estado_Activo`) REFERENCES `estadoactivo` (`IdEstado`);

--
-- Filtros para la tabla `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`CC_Instructor`) REFERENCES `datos` (`CC`),
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`Id_Reporte`) REFERENCES `reporte` (`IdReporte`);

--
-- Filtros para la tabla `hoja_vida_activo`
--
ALTER TABLE `hoja_vida_activo`
  ADD CONSTRAINT `hoja_vida_activo_ibfk_1` FOREIGN KEY (`Tipo_Accion`) REFERENCES `tipo_modificacion` (`id`),
  ADD CONSTRAINT `hoja_vida_activo_ibfk_2` FOREIGN KEY (`IdActivo`) REFERENCES `activo` (`id`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`CC`) REFERENCES `datos` (`CC`);

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`TipoEquipo`) REFERENCES `tipoactivo` (`IdTipoActivo`),
  ADD CONSTRAINT `reporte_ibfk_2` FOREIGN KEY (`CC`) REFERENCES `datos` (`CC`),
  ADD CONSTRAINT `reporte_ibfk_3` FOREIGN KEY (`EstadoReporte`) REFERENCES `estadorerporte` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

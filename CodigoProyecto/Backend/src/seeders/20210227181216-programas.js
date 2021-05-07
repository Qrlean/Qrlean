'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Programas', [
            { nombre_programa: 'Actividad física' },
            { nombre_programa: 'Actuación' },
            { nombre_programa: 'Agricultura de precisión' },
            { nombre_programa: 'Agrobiotecnología' },
            { nombre_programa: 'Agroindustria alimentaria' },
            { nombre_programa: 'Agroindustria panelera' },
            { nombre_programa: 'Agua y saneamiento' },
            {
                nombre_programa:
                    'Alistamiento de laboratorios de análisis y ensayos para la industria',
            },
            {
                nombre_programa:
                    'Almacenamiento, empaque y embalaje de objetos',
            },
            {
                nombre_programa:
                    'Almacenamiento, empaque y embalaje de objetos',
            },
            {
                nombre_programa:
                    'Análisis y desarrollo de sistemas de información',
            },
            { nombre_programa: 'Animación 3d' },
            { nombre_programa: 'Animación digital' },
            { nombre_programa: 'Análisis de materiales para la industria' },
            { nombre_programa: 'Análisis de muestras químicas' },
            { nombre_programa: 'Apoyo administrativo en salud' },
            {
                nombre_programa:
                    'Apoyo logístico en eventos y servicios empresariales',
            },
            {
                nombre_programa:
                    'Aprovechamiento y beneficio del cultivo del caucho natural',
            },
            { nombre_programa: 'Artesanías tradicionales en tejido de punto' },
            {
                nombre_programa:
                    'Aseguramiento de la calidad del café en la finca',
            },
            { nombre_programa: 'Aseguramiento metrológico industrial' },
            { nombre_programa: 'Asesoría comercial' },
            {
                nombre_programa:
                    'Asesoría comercial y operaciones de entidades financieras',
            },
            { nombre_programa: 'Asistencia administrativa' },
            { nombre_programa: 'Ejecución de programas deportivos' },
            {
                nombre_programa:
                    'Ejecución musical con instrumentos funcionales',
            },
            { nombre_programa: 'El riesgo crediticio y su administración' },
            {
                nombre_programa:
                    'Elaboración de prendas de vestir sobre medidas',
            },
            { nombre_programa: 'Elaboración de productos de confitería' },
            { nombre_programa: 'Impresión digital' },
            { nombre_programa: 'Asistencia en la función pública' },
            { nombre_programa: 'Asistencia en organización de archivos' },
            { nombre_programa: 'Atención integral a la primera infancia' },
            {
                nombre_programa:
                    'Agroindustria alimentaria al paciente domiciliario',
            },
            { nombre_programa: 'Atención prehospitalaria' },
            { nombre_programa: 'Automatización industrial' },
            {
                nombre_programa:
                    'Bilingual expert on business process outsourcing',
            },
            { nombre_programa: 'Carpintería' },
            { nombre_programa: 'Carpintería metálica' },
            { nombre_programa: 'Carpintero instalador' },
            { nombre_programa: 'Carpintería de aluminio' },
            { nombre_programa: 'Catastro' },
            { nombre_programa: 'Cocina' },
            { nombre_programa: 'Comercialización de alimentos' },
            { nombre_programa: 'Comercialización de productos masivos' },
            { nombre_programa: 'Comercio internacional' },
            { nombre_programa: 'Compras y suministros' },
            { nombre_programa: 'Comunicación comercial' },
            { nombre_programa: 'Confección industrial de ropa deportiva' },
            { nombre_programa: 'Confección industrial de ropa exterior' },
            { nombre_programa: 'Asesoría comercial' },
            { nombre_programa: 'Confección industrial' },
            { nombre_programa: 'Conservación de recursos naturales' },
            { nombre_programa: 'Construcción de estructuras en concreto' },
            {
                nombre_programa:
                    'Construcción de redes de acueducto y alcantarillado',
            },
            {
                nombre_programa:
                    'Construcción y montaje de instalaciones eléctricas',
            },
            { nombre_programa: 'Construcciones en madera' },
            { nombre_programa: 'Construcciones livianas en seco' },
            { nombre_programa: 'Construcción de edificaciones' },
            { nombre_programa: 'Construcción de estructuras en concreto' },
            { nombre_programa: 'Construcción de vías' },
            { nombre_programa: 'Contabilidad y finanzas' },
            { nombre_programa: 'Elaboración de audiovisuales' },
            {
                nombre_programa:
                    'Elaboración de objetos artesanales con semillas y maderables',
            },
            {
                nombre_programa:
                    'Contabilización de operaciones comerciales y financieras',
            },
            { nombre_programa: 'Control de calidad de alimentos' },
            { nombre_programa: 'Control de calidad en confección industrial' },
            { nombre_programa: 'Control de calidad en confección' },
            {
                nombre_programa:
                    'Control de movilidad transporte y seguridad vial',
            },
            { nombre_programa: 'Coordinación de escuelas de música' },
            { nombre_programa: 'Corte y venta de carnes' },
            { nombre_programa: 'Cosmetología y estética integral' },
            { nombre_programa: 'Cría y levante de pollitas' },
            { nombre_programa: 'Cuidado estético de manos y pies' },
            { nombre_programa: 'Cultivo y cosecha de palma de aceite' },
            { nombre_programa: 'Cultivos agrícolas' },
            { nombre_programa: 'Decoración de espacios interiores' },
            {
                nombre_programa:
                    'Desarrollo de aplicaciones para dispositivos móviles',
            },
            {
                nombre_programa:
                    'Desarrollo de operaciones logística en la cadena de abastecimiento',
            },
            { nombre_programa: 'Desarrollo de videojuegos' },
            {
                nombre_programa:
                    'Diagnóstico y análisis organizacional para unidades productivas',
            },
            { nombre_programa: 'Dibujo arquitectónico' },
            { nombre_programa: 'Dibujo mecánico' },
            { nombre_programa: 'Dirección de ventas' },
            { nombre_programa: 'Diseño de componentes para calzado' },
            {
                nombre_programa:
                    'Diseño de elementos mecánicos para su fabricación con máquinas herramientas cnc',
            },
            { nombre_programa: 'Diseño de videojuegos' },
            { nombre_programa: 'Diseño e integración de multimedia' },
            {
                nombre_programa:
                    'Diseño e integración de automatismos mecatrónicos',
            },
            {
                nombre_programa:
                    'Diseño y desarrollo de investigaciones de mercado',
            },
            { nombre_programa: 'Ebanistería' },
            {
                nombre_programa:
                    'Ejecución de clases grupales orientadas al fitness',
            },
            {
                nombre_programa:
                    'Ejecución de eventos deportivos y recreativos',
            },
            { nombre_programa: 'Ejecución de la danza' },
        ]);
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Programas', null, {});
    },
};

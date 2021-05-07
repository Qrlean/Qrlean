'use strict';

module.exports = {
    up: async (queryInterface) => {
        queryInterface.bulkInsert('Asignaturas', [
            { nombre_asignatura: 'Inducción al sena' },
            { nombre_asignatura: 'Ética' },
            { nombre_asignatura: 'Comunicación' },
            { nombre_asignatura: 'Resolución de problemas' },
            { nombre_asignatura: 'Actividad física' },
            { nombre_asignatura: 'Matemáticas' },
            { nombre_asignatura: 'Ciencias naturales' },
            { nombre_asignatura: 'Dimensión ambiental' },
            { nombre_asignatura: 'Salud ocupacional' },
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
        await queryInterface.bulkDelete('Asignaturas', null, {});
    },
};

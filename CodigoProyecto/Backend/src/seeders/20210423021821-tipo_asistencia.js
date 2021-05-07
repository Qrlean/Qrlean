'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            'Tipo_asistencias',
            [
                {
                    nombre_tipo_asistencia: 'Asistió.',
                },
                {
                    nombre_tipo_asistencia: 'No asistió.',
                },
                {
                    nombre_tipo_asistencia: 'Asistió con retardo.',
                },
                {
                    nombre_tipo_asistencia: 'Asistió con excusa.',
                },
            ],
            {},
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Tipo_asistencias', null, {});
    },
};

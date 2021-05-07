'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Tipo_roles', [
            {
                nombre_rol: 'Administrador',
            },
            {
                nombre_rol: 'Instructor',
            },
            {
                nombre_rol: 'Aprendiz',
            },
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Tipo_roles', null, {});
    },
};

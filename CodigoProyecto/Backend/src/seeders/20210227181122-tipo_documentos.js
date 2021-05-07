'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Tipo_documentos', [
            {
                nombre_documento: 'Cedula de ciudadanía.',
            },
            {
                nombre_documento: 'Tarjeta de identidad.',
            },
            {
                nombre_documento: 'Cedula de extranjería.',
            },
            {
                nombre_documento: 'Pasaporte.',
            },
        ]);
    },

    down: async (queryInterface) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Tipo_documentos', null, {});
    },
};

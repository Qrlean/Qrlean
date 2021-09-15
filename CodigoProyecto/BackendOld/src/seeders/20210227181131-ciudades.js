'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Ciudades', [
            { nombre_ciudad: 'Bogotá', id_departamento: 15 },
            { nombre_ciudad: 'Medellín', id_departamento: 2 },
            { nombre_ciudad: 'Santiago de Cali', id_departamento: 31 },
            { nombre_ciudad: 'Barranquilla', id_departamento: 4 },
            { nombre_ciudad: 'Cartagena', id_departamento: 5 },
            { nombre_ciudad: 'San Jose de Cucuta', id_departamento: 23 },
            { nombre_ciudad: 'Bucaramanga', id_departamento: 28 },
            { nombre_ciudad: 'Soledad', id_departamento: 4 },
            { nombre_ciudad: 'Ibagué', id_departamento: 30 },
            { nombre_ciudad: 'Soacha', id_departamento: 14 },
            { nombre_ciudad: 'Pereira', id_departamento: 26 },
            { nombre_ciudad: 'Santa_Marta', id_departamento: 20 },
            { nombre_ciudad: 'Villavicencio', id_departamento: 21 },
            { nombre_ciudad: 'Bello', id_departamento: 2 },
            { nombre_ciudad: 'Valledupar', id_departamento: 11 },
            { nombre_ciudad: 'Pasto', id_departamento: 22 },
            { nombre_ciudad: 'Buenaventuta', id_departamento: 31 },
            { nombre_ciudad: 'Montería', id_departamento: 13 },
            { nombre_ciudad: 'Manizales', id_departamento: 7 },
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Ciudades', null, {});
    },
};

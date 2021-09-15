'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Departamentos', [
            { nombre_departamento: 'Amazonas' },
            { nombre_departamento: 'Amazonas' },
            { nombre_departamento: 'Antioquia' },
            { nombre_departamento: 'Arauca' },
            { nombre_departamento: 'Atlántico' },
            { nombre_departamento: 'Bolívar' },
            { nombre_departamento: 'Boyacá' },
            { nombre_departamento: 'Caldas' },
            { nombre_departamento: 'Caquetá' },
            { nombre_departamento: 'Casanare' },
            { nombre_departamento: 'Cauca' },
            { nombre_departamento: 'Cesar' },
            { nombre_departamento: 'Chocó' },
            { nombre_departamento: 'Córdoba' },
            { nombre_departamento: 'Cundinamarca' },
            { nombre_departamento: 'Distrito Capital' },
            { nombre_departamento: 'Guainía' },
            { nombre_departamento: 'Guaviare' },
            { nombre_departamento: 'Huila' },
            { nombre_departamento: 'Guajira' },
            { nombre_departamento: 'Magdalena' },
            { nombre_departamento: 'Meta' },
            { nombre_departamento: 'Nariño' },
            { nombre_departamento: 'Norte Santander' },
            { nombre_departamento: 'Putumayo' },
            { nombre_departamento: 'Quindío' },
            { nombre_departamento: 'Risaralda' },
            { nombre_departamento: 'San Andrés' },
            { nombre_departamento: 'Santander' },
            { nombre_departamento: 'Sucre' },
            { nombre_departamento: 'Tolima' },
            { nombre_departamento: 'Valle' },
            { nombre_departamento: 'Vaupés' },
            { nombre_departamento: 'Vichada' },
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Departamentos', null, {});
    },
};

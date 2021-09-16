import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Departamentos } from '../../usuarios/entities/departamentos.entity';
import { Ciudades } from '../../usuarios/entities/ciudades.entity';
import { Tipo_roles } from '../../usuarios/entities/tipo-roles.entity';
import { Tipo_documento } from '../../usuarios/entities/tipo-documento.entity';

@Injectable()
export default class SeedDatabaseService {
    constructor(private readonly connection: Connection) {}
    public async run(): Promise<any> {
        const res = await this.connection.query(
            'SELECT COUNT(id_departamento) FROM departamentos;',
        );
        if (!(res[0].count === '0')) {
            return;
        }
        await this.connection
            .createQueryBuilder()
            .insert()
            .into(Departamentos)
            .values([
                { id_departamento: 1, nombre_departamento: 'Amazonas' },
                { id_departamento: 2, nombre_departamento: 'Antioquia' },
                { id_departamento: 3, nombre_departamento: 'Arauca' },
                { id_departamento: 4, nombre_departamento: 'Atlántico' },
                { id_departamento: 5, nombre_departamento: 'Bolívar' },
                { id_departamento: 6, nombre_departamento: 'Boyacá' },
                { id_departamento: 7, nombre_departamento: 'Caldas' },
                { id_departamento: 8, nombre_departamento: 'Caquetá' },
                { id_departamento: 9, nombre_departamento: 'Casanare' },
                { id_departamento: 10, nombre_departamento: 'Cauca' },
                { id_departamento: 11, nombre_departamento: 'Cesar' },
                { id_departamento: 12, nombre_departamento: 'Chocó' },
                { id_departamento: 13, nombre_departamento: 'Córdoba' },
                { id_departamento: 14, nombre_departamento: 'Cundinamarca' },
                {
                    id_departamento: 15,
                    nombre_departamento: 'Distrito Capital',
                },
                { id_departamento: 16, nombre_departamento: 'Guainía' },
                { id_departamento: 17, nombre_departamento: 'Guaviare' },
                { id_departamento: 18, nombre_departamento: 'Huila' },
                { id_departamento: 19, nombre_departamento: 'Guajira' },
                { id_departamento: 20, nombre_departamento: 'Magdalena' },
                { id_departamento: 21, nombre_departamento: 'Meta' },
                { id_departamento: 22, nombre_departamento: 'Nariño' },
                { id_departamento: 23, nombre_departamento: 'Norte Santander' },
                { id_departamento: 24, nombre_departamento: 'Putumayo' },
                { id_departamento: 25, nombre_departamento: 'Quindío' },
                { id_departamento: 26, nombre_departamento: 'Risaralda' },
                { id_departamento: 27, nombre_departamento: 'San Andrés' },
                { id_departamento: 28, nombre_departamento: 'Santander' },
                { id_departamento: 29, nombre_departamento: 'Sucre' },
                { id_departamento: 30, nombre_departamento: 'Tolima' },
                { id_departamento: 31, nombre_departamento: 'Valle' },
                { id_departamento: 32, nombre_departamento: 'Vaupés' },
                { id_departamento: 33, nombre_departamento: 'Vichada' },
            ])
            .execute();
        await this.connection
            .createQueryBuilder()
            .insert()
            .into(Ciudades)
            .values([
                {
                    id_ciudad: 1,
                    nombre_ciudad: 'Bogotá',
                    departamento: { id_departamento: 1 },
                },
                {
                    id_ciudad: 2,
                    nombre_ciudad: 'Medellín',
                    departamento: { id_departamento: 2 },
                },
                {
                    id_ciudad: 3,
                    nombre_ciudad: 'Santiago de Cali',
                    departamento: { id_departamento: 31 },
                },
                {
                    id_ciudad: 4,
                    nombre_ciudad: 'Barranquilla',
                    departamento: { id_departamento: 4 },
                },
                {
                    id_ciudad: 5,
                    nombre_ciudad: 'Cartagena',
                    departamento: { id_departamento: 5 },
                },
                {
                    id_ciudad: 6,
                    nombre_ciudad: 'San Jose de Cucuta',
                    departamento: { id_departamento: 23 },
                },
                {
                    id_ciudad: 7,
                    nombre_ciudad: 'Bucaramanga',
                    departamento: { id_departamento: 28 },
                },
                {
                    id_ciudad: 8,
                    nombre_ciudad: 'Soledad',
                    departamento: { id_departamento: 4 },
                },
                {
                    id_ciudad: 9,
                    nombre_ciudad: 'Ibagué',
                    departamento: { id_departamento: 30 },
                },
                {
                    id_ciudad: 10,
                    nombre_ciudad: 'Soacha',
                    departamento: { id_departamento: 14 },
                },
                {
                    id_ciudad: 11,
                    nombre_ciudad: 'Pereira',
                    departamento: { id_departamento: 26 },
                },
                {
                    id_ciudad: 12,
                    nombre_ciudad: 'Santa_Marta',
                    departamento: { id_departamento: 20 },
                },
                {
                    id_ciudad: 13,
                    nombre_ciudad: 'Villavicencio',
                    departamento: { id_departamento: 21 },
                },
                {
                    id_ciudad: 14,
                    nombre_ciudad: 'Bello',
                    departamento: { id_departamento: 2 },
                },
                {
                    id_ciudad: 15,
                    nombre_ciudad: 'Valledupar',
                    departamento: { id_departamento: 11 },
                },
                {
                    id_ciudad: 16,
                    nombre_ciudad: 'Pasto',
                    departamento: { id_departamento: 22 },
                },
                {
                    id_ciudad: 17,
                    nombre_ciudad: 'Buenaventuta',
                    departamento: { id_departamento: 31 },
                },
                {
                    id_ciudad: 18,
                    nombre_ciudad: 'Montería',
                    departamento: { id_departamento: 13 },
                },
                {
                    id_ciudad: 19,
                    nombre_ciudad: 'Manizales',
                    departamento: { id_departamento: 7 },
                },
            ])
            .execute();
        await this.connection
            .createQueryBuilder()
            .insert()
            .into(Tipo_roles)
            .values([
                {
                    id_tipo_rol: 1,
                    nombre_rol: 'Administrador',
                },
                {
                    id_tipo_rol: 2,
                    nombre_rol: 'Instructor',
                },
                {
                    id_tipo_rol: 3,
                    nombre_rol: 'Aprendiz',
                },
            ])
            .execute();
        await this.connection
            .createQueryBuilder()
            .insert()
            .into(Tipo_documento)
            .values([
                {
                    id_tipo_documento: 1,
                    nombre_tipo_documento: 'Cedula de ciudadanía.',
                },
                {
                    id_tipo_documento: 2,
                    nombre_tipo_documento: 'Tarjeta de identidad.',
                },
                {
                    id_tipo_documento: 3,
                    nombre_tipo_documento: 'Cedula de extranjería.',
                },
                {
                    id_tipo_documento: 4,
                    nombre_tipo_documento: 'Pasaporte.',
                },
            ])
            .execute();
    }
}

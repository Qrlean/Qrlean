import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Ciudades } from '../../ciudades/entities/ciudades.entity';

export default class CiudadesSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Ciudades)
            .values([
                {
                    nombre_ciudad: 'Bogotá',
                    departamento: { id_departamento: 1 },
                },
                {
                    nombre_ciudad: 'Medellín',
                    departamento: { id_departamento: 2 },
                },
                {
                    nombre_ciudad: 'Santiago de Cali',
                    departamento: { id_departamento: 31 },
                },
                {
                    nombre_ciudad: 'Barranquilla',
                    departamento: { id_departamento: 4 },
                },
                {
                    nombre_ciudad: 'Cartagena',
                    departamento: { id_departamento: 5 },
                },
                {
                    nombre_ciudad: 'San Jose de Cucuta',
                    departamento: { id_departamento: 23 },
                },
                {
                    nombre_ciudad: 'Bucaramanga',
                    departamento: { id_departamento: 28 },
                },
                {
                    nombre_ciudad: 'Soledad',
                    departamento: { id_departamento: 4 },
                },
                {
                    nombre_ciudad: 'Ibagué',
                    departamento: { id_departamento: 30 },
                },
                {
                    nombre_ciudad: 'Soacha',
                    departamento: { id_departamento: 14 },
                },
                {
                    nombre_ciudad: 'Pereira',
                    departamento: { id_departamento: 26 },
                },
                {
                    nombre_ciudad: 'Santa_Marta',
                    departamento: { id_departamento: 20 },
                },
                {
                    nombre_ciudad: 'Villavicencio',
                    departamento: { id_departamento: 21 },
                },
                {
                    nombre_ciudad: 'Bello',
                    departamento: { id_departamento: 2 },
                },
                {
                    nombre_ciudad: 'Valledupar',
                    departamento: { id_departamento: 11 },
                },
                {
                    nombre_ciudad: 'Pasto',
                    departamento: { id_departamento: 22 },
                },
                {
                    nombre_ciudad: 'Buenaventuta',
                    departamento: { id_departamento: 31 },
                },
                {
                    nombre_ciudad: 'Montería',
                    departamento: { id_departamento: 13 },
                },
                {
                    nombre_ciudad: 'Manizales',
                    departamento: { id_departamento: 7 },
                },
            ])
            .execute();
    }
}

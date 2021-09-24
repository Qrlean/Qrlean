import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Tipo_roles } from '../../usuarios/entities/tipo-roles.entity';

export default class RolesSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Tipo_roles)
            .values([
                {
                    nombre_rol: 'Administrador',
                },
                {
                    nombre_rol: 'Instructor',
                },
                {
                    nombre_rol: 'Aprendiz',
                },
            ])
            .execute();
    }
}

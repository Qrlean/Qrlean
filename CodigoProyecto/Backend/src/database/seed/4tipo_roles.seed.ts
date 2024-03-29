import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { TipoRoles } from '../../usuarios/entities/tipo-roles.entity';

export default class RolesSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(TipoRoles)
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

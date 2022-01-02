import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Asignatura } from '../../asignaturas/entities/asignatura.entity';

export default class AsignaturasSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Asignatura)
            .values([
                {
                    nombre_asignatura: 'Ingles',
                },
            ])
            .execute();
    }
}

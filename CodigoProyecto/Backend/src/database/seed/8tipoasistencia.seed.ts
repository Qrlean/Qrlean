import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { TipoAsistencia } from '../../asistencias/entities/tipo_asistencias.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
export default class TipoAsistenciaSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(TipoAsistencia)
            .values([
                { nombre_tipo_asistencia: 'Por firmar' },
                { nombre_tipo_asistencia: 'Inasistencia' },
                { nombre_tipo_asistencia: 'Asistencia' },
                { nombre_tipo_asistencia: 'Asistencia con retardo' },
                { nombre_tipo_asistencia: 'Inasistencia con excusa' },
            ])
            .execute();
    }
}

import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Tipo_documento } from '../../usuarios/entities/tipo-documento.entity';

export default class DocumentosSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Tipo_documento)
            .values([
                {
                    nombre_tipo_documento: 'Cedula de ciudadanía.',
                },
                {
                    nombre_tipo_documento: 'Tarjeta de identidad.',
                },
                {
                    nombre_tipo_documento: 'Cedula de extranjería.',
                },
                {
                    nombre_tipo_documento: 'Pasaporte.',
                },
            ])
            .execute();
    }
}

import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
export default class UsuariosSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Usuario)
            .values([
                {
                    nombres_usuario: 'Camilo',
                    apellidos_usuario: 'Garcia',
                    numero_documento: parseInt(
                        process.env.DEFAULT_DOCUMENTO_ADMIN,
                    ),
                    id_tipo_rol: 1,
                    id_tipo_documento: 1,
                    password: await bcrypt.hash(
                        process.env.DEFAULT_PASSWORD_ADMIN,
                        10,
                    ),
                    id_ciudad: 1,
                    direccion_residencial: 'Crra 5 abis n 48 r 08 sur',
                    telefono_movil: 3193617146,
                    emailInstitucional: process.env.DEFAULT_EMAIL_ADMIN,
                },
            ])
            .execute();
    }
}

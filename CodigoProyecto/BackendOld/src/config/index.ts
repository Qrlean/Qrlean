import { Sequelize } from 'sequelize-typescript';
import { Usuario } from '../models/usuarios.model';
import { Departamento } from '../models/departamentos.models';
import { Ciudades } from '../models/cuidades.model';
import { Tipo_roles } from '../models/tipo_roles.models';
import { Tipo_documento } from '../models/tipo_documento.model';
import { Ficha } from '../models/ficha.model';
import { Asociacion_usuarios_fichas } from '../models/asociacion_usuarios_fichas.model';
import { Programa } from '../models/programa.model';
import { Solicitudes_cambio_asistencia } from '../models/solicitudes_cambio_asistencia.model';
import { Asociacion_asignaturas_fichas } from '../models/asociacion_asignaturas_fichas.model';
import { Asignatura } from '../models/asignaturas.model';
import { Clases } from '../models/clases.model';
import { Asistencias } from '../models/asistencias.model';
import { Tipo_asistencias } from '../models/tipo_asistencias.model';
import { Tipo_estados_solicitudes } from '../models/tipo_estados_solicitudes';
import { Dialect } from 'sequelize/types';
// console.log(path.resolve(__dirname, '../models'))
console.log('Cargando db');
export const sequelize = new Sequelize({
    host: process.env.DATABASE_HOST,
    port: <number>(process.env.DATABASE_PORT as unknown),
    dialect: <Dialect>(process.env.DATABASE_DRIVER as unknown) || 'postgres',
    database: process.env.DATABASE,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    storage: ':memory:',
    models: [
        Tipo_estados_solicitudes,
        Usuario,
        Departamento,
        Ciudades,
        Tipo_roles,
        Tipo_documento,
        Ficha,
        Asociacion_usuarios_fichas,
        Programa,
        Solicitudes_cambio_asistencia,
        Asignatura,
        Asociacion_asignaturas_fichas,
        Clases,
        Asistencias,
        Tipo_asistencias,
    ],
});

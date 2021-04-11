import { Usuario } from './usuarios.model';
import { Ficha } from './ficha.model';
import { Solicitudes_cambio_asistencia } from './solicitudes_cambio_asistencia.model';
import { Asociacion_asignaturas_fichas } from './asociacion_asignaturas_fichas.model';
import {
    Column,
    Model,
    PrimaryKey,
    AllowNull,
    Table,
    ForeignKey,
    HasMany,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Asociacion_usuarios_fichas extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column
    id_asociacion_usuario_ficha!: number;

    @ForeignKey(() => Usuario)
    @AllowNull(false)
    @Column
    id_usuario!: number;

    @ForeignKey(() => Ficha)
    @AllowNull(false)
    @Column
    id_ficha!: number;

    @HasMany(() => Solicitudes_cambio_asistencia, 'id_aprendiz')
    solicitudesCambioAsistenciaAprendiz!: Solicitudes_cambio_asistencia[];

    @HasMany(() => Solicitudes_cambio_asistencia, 'id_instructor')
    solicitudesCambioAsistenciaInstructor!: Solicitudes_cambio_asistencia[];

    @HasMany(() => Asociacion_asignaturas_fichas)
    materia!: Asociacion_asignaturas_fichas[];
}

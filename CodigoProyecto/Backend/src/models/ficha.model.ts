import { Programa } from './programa.model';
import { Usuario } from './usuarios.model';
import { Asociacion_usuarios_fichas } from './asociacion_usuarios_fichas.model';
import { Solicitudes_cambio_asistencia } from './solicitudes_cambio_asistencia.model';
import { Asignatura } from './asignaturas.model';
import { Asociacion_asignaturas_fichas } from './asociacion_asignaturas_fichas.model';
import {
    Table,
    Model,
    PrimaryKey,
    AutoIncrement,
    Column,
    AllowNull,
    BelongsTo,
    ForeignKey,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Ficha extends Model {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column
    id_ficha!: number;

    @AllowNull(false)
    @ForeignKey(() => Programa)
    @Column
    id_programa!: number;

    @BelongsTo(() => Programa)
    programa!: Programa;

    @BelongsToMany(() => Usuario, () => Asociacion_usuarios_fichas)
    usuarios!: Usuario[];

    @HasMany(() => Solicitudes_cambio_asistencia)
    solicitudesCambioAsistencia!: Solicitudes_cambio_asistencia[];

    @BelongsToMany(() => Asignatura, () => Asociacion_asignaturas_fichas)
    asignaturas!: Asignatura[];
}

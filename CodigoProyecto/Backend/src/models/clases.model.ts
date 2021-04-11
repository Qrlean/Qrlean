import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    BelongsTo,
} from 'sequelize-typescript';
import { Asociacion_asignaturas_fichas } from './asociacion_asignaturas_fichas.model';
import { Asistencias } from './asistencias.model';

@Table({ timestamps: false })
export class Clases extends Model {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column
    id_clase!: number;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    nombre_clase!: string;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    dia!: Date;

    @AllowNull(false)
    @Column(DataType.TIME)
    hora_inicio!: Date;

    @AllowNull(false)
    @Column(DataType.TIME)
    hora_final!: Date;

    @ForeignKey(() => Asociacion_asignaturas_fichas)
    @AllowNull(false)
    @Column
    id_asociacion_asignatura_ficha!: number;

    @BelongsTo(() => Asociacion_asignaturas_fichas)
    asignatura!: Asociacion_asignaturas_fichas;

    @HasMany(() => Asistencias)
    asistencias!: Asistencias[];
}

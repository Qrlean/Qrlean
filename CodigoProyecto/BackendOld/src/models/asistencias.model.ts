import { Tipo_asistencias } from './tipo_asistencias.model';
import { Clases } from './clases.model';
import { Asociacion_usuarios_fichas } from './asociacion_usuarios_fichas.model';
import { Solicitudes_cambio_asistencia } from './solicitudes_cambio_asistencia.model';
import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Asistencias extends Model {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column
    id_asistencia!: number;

    @AllowNull(false)
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    hora_firmada!: Date;

    @AllowNull(false)
    @ForeignKey(() => Clases)
    @Column
    id_clase!: number;

    @AllowNull(false)
    @ForeignKey(() => Tipo_asistencias)
    @Column
    id_tipo_asistencia!: number;

    @AllowNull(false)
    @ForeignKey(() => Asociacion_usuarios_fichas)
    @Column
    id_aprendiz!: number;

    @AllowNull(true)
    @Default(null)
    @ForeignKey(() => Solicitudes_cambio_asistencia)
    @Column(DataType.INTEGER)
    id_solicitud_cambio_asistencia: number | undefined;

    @BelongsTo(() => Solicitudes_cambio_asistencia)
    solicitud_cambio_asistencia!: Solicitudes_cambio_asistencia;

    @BelongsTo(() => Tipo_asistencias)
    tipo_asistencia!: Tipo_asistencias;

    @BelongsTo(() => Clases)
    clase!: Clases;

    @BelongsTo(() => Asociacion_usuarios_fichas)
    aprendiz!: Asociacion_usuarios_fichas;
}

import {
    AllowNull,
    Column,
    HasMany,
    Model,
    PrimaryKey,
	Table
} from 'sequelize-typescript';
import { Solicitudes_cambio_asistencia } from './solicitudes_cambio_asistencia.model';

@Table({ timestamps: false })
export class Tipo_estados_solicitudes extends Model {
    @AllowNull(false)
    @PrimaryKey
    @Column
    id_estado!: number;

    @AllowNull(false)
    @Column
    nombre_estado!: string;

    @HasMany(() => Solicitudes_cambio_asistencia)
    solicitudes!: Solicitudes_cambio_asistencia[];
}

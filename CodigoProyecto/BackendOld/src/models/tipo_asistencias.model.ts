import { Asistencias } from './asistencias.model';
import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Tipo_asistencias extends Model {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column
    id_tipo_asistencia!: number;

    @AllowNull(false)
    @Column(DataType.STRING(25))
    nombre_tipo_asistencia!: string;

    @HasMany(() => Asistencias)
    asistencias!: Asistencias[];
}

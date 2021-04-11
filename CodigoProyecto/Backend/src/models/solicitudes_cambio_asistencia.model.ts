import { Asociacion_usuarios_fichas } from './asociacion_usuarios_fichas.model';
import { Usuario } from './usuarios.model';
import { Ficha } from './ficha.model';
import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Solicitudes_cambio_asistencia extends Model {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column
    id_solicitud_cambio_asistencia!: number;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    asunto!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    contenido!: string;

    @ForeignKey(() => Asociacion_usuarios_fichas)
    @AllowNull(false)
    @Column
    id_aprendiz!: number;

    @ForeignKey(() => Asociacion_usuarios_fichas)
    @AllowNull(false)
    @Column
    id_instructor!: number;

    @ForeignKey(() => Ficha)
    @AllowNull(false)
    @Column
    id_ficha!: number;

    @BelongsTo(() => Asociacion_usuarios_fichas, 'id_aprendiz')
    aprendiz!: Usuario;

    @BelongsTo(() => Asociacion_usuarios_fichas, 'id_instructor')
    instructor!: Usuario;

    @BelongsTo(() => Ficha)
    ficha!: Ficha;
}

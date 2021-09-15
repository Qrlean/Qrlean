import { Asociacion_usuarios_fichas } from './asociacion_usuarios_fichas.model';
import { Asignatura } from './asignaturas.model';
import { Ficha } from './ficha.model';
import { Clases } from './clases.model';
import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Asociacion_asignaturas_fichas extends Model {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column
    id_asociacion_asignatura_ficha!: number;

    @AllowNull(false)
    @ForeignKey(() => Ficha)
    @Column
    id_ficha!: number;

    @BelongsTo(() => Ficha)
    ficha: Ficha;

    @AllowNull(false)
    @ForeignKey(() => Asignatura)
    @Column
    id_asignatura!: number;
    @BelongsTo(() => Asignatura)
    asignatura: Asignatura;

    @AllowNull(false)
    @ForeignKey(() => Asociacion_usuarios_fichas)
    @Column
    id_instructor!: number;

    @BelongsTo(() => Asociacion_usuarios_fichas)
    instructor!: Asociacion_usuarios_fichas;

    @HasMany(() => Clases)
    clases!: Clases[];
}

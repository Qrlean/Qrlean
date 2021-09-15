import { Ficha } from './ficha.model';
import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Asociacion_asignaturas_fichas } from './asociacion_asignaturas_fichas.model';
@Table({ timestamps: false })
export class Asignatura extends Model {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column
    id_asignatura!: number;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    nombre_asignatura!: string;

    @BelongsToMany(() => Ficha, () => Asociacion_asignaturas_fichas)
    fichas!: Ficha[];

    @HasMany(() => Asociacion_asignaturas_fichas, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        hooks: true,
    })
    fichasT!: Asociacion_asignaturas_fichas[];
}

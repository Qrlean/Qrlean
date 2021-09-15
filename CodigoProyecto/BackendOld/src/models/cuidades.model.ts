import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Departamento } from './departamentos.models';
import { Usuario } from './usuarios.model';

@Table({ timestamps: false })
export class Ciudades extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id_ciudad!: number;

    @Column(DataType.STRING(30))
    nombre_ciudad!: string;

    @ForeignKey(() => Departamento)
    @AllowNull(false)
    @Column
    id_departamento!: number;

    @BelongsTo(() => Departamento)
    departamento!: Departamento;

    @HasMany(() => Usuario)
    usuarios!: Usuario[];
}

import {
    Table,
    Model,
    Column,
    AutoIncrement,
    PrimaryKey,
    DataType,
    AllowNull,
    HasMany,
} from 'sequelize-typescript';
import { Ciudades } from './cuidades.model';

@Table({ timestamps: false })
export class Departamento extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id_departamento!: number;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    nombre_departamento!: string;

    @HasMany(() => Ciudades)
    ciudades!: Ciudades[];
}

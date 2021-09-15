import { Ficha } from './ficha.model';
import {
    Table,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType,
    HasMany,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Programa extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id_programa!: number;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    nombre_programa!: string;

    @HasMany(() => Ficha)
    fichas!: Ficha[];
}

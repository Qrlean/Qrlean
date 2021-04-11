import {
    AllowNull,
    AutoIncrement,
    Column,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Usuario } from './usuarios.model';

@Table
export class Tipo_documento extends Model {
    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column
    id_tipo_documento!: number;

    @HasMany(() => Usuario)
    usuarios!: Usuario[];

    @AllowNull(false)
    @Column
    nombre_documento!: string;
}

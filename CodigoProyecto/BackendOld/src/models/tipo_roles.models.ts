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
import { Usuario } from './usuarios.model';

@Table({ timestamps: false })
export class Tipo_roles extends Model {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column
    id_tipo_rol!: number;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    nombre_rol!: string;

    @HasMany(() => Usuario)
    usuarios!: Usuario[];
}

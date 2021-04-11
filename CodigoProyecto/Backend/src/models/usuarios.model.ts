import {
    Table,
    Column,
    Model,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Comment,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
} from 'sequelize-typescript';
import { Ciudades } from './cuidades.model';
import { Tipo_roles } from './tipo_roles.models';
import { Ficha } from './ficha.model';
import { Asociacion_usuarios_fichas } from './asociacion_usuarios_fichas.model';
import { Tipo_documento } from './tipo_documento.model';

@Table({ timestamps: false })
export class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id_usuario!: number;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    nombres_usuario!: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    apellidos_usuario!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    numero_documento!: number;

    @AllowNull(false)
    @Column(DataType.STRING(150))
    password!: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    emailInstitucional!: string;

    @AllowNull(true)
    @Column(DataType.STRING(60))
    direccion_recidencial!: string;

    @Comment('Adios')
    @AllowNull(true)
    @Column(DataType.INTEGER)
    telefono_movil!: number;

    @ForeignKey(() => Ciudades)
    @AllowNull(false)
    @Column
    id_ciudad!: number;

    @ForeignKey(() => Tipo_roles)
    @AllowNull(false)
    @Column
    id_tipo_rol!: number;

    @ForeignKey(() => Tipo_documento)
    @AllowNull(false)
    @Column
    id_tipo_documento!: number;

    @BelongsTo(() => Ciudades)
    ciudad!: Ciudades;

    @BelongsTo(() => Tipo_roles)
    rol!: Tipo_roles;

    @BelongsToMany(() => Ficha, () => Asociacion_usuarios_fichas)
    fichas!: Ficha[];
}

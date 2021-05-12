import {
    Table,
    Column,
    Model,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    Unique,
    HasMany,
} from 'sequelize-typescript';
import { Ciudades } from '../models/cuidades.model';
import { Tipo_documento } from '../models/tipo_documento.model';
import { Tipo_roles } from '../models/tipo_roles.models';
import { Ficha } from '../models/ficha.model';
import { Asociacion_usuarios_fichas } from './asociacion_usuarios_fichas.model';
// import { v4 as uuidv4 } from 'uuid';

@Table({ timestamps: false })
export class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id_usuario: number;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    nombres_usuario: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    apellidos_usuario: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.INTEGER)
    numero_documento: number;

    @AllowNull(false)
    @Column(DataType.STRING(150))
    password: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(100))
    emailInstitucional: string;

    @AllowNull(true)
    @Column(DataType.STRING(60))
    direccion_residencial: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    telefono_movil: number;

    @ForeignKey(() => Ciudades)
    @AllowNull(false)
    @Column
    id_ciudad: number;

    @ForeignKey(() => Tipo_roles)
    @AllowNull(false)
    @Column
    id_tipo_rol: number;

    @ForeignKey(() => Tipo_documento)
    @AllowNull(false)
    @Column
    id_tipo_documento: number;

    @BelongsTo(() => Ciudades)
    ciudad: Ciudades;

    @BelongsTo(() => Tipo_roles)
    rol: Tipo_roles;

    @BelongsTo(() => Tipo_documento)
    documento: Tipo_documento;

    @BelongsToMany(() => Ficha, () => Asociacion_usuarios_fichas)
    fichas: Ficha[];

    @HasMany(() => Asociacion_usuarios_fichas)
    fichasT!: Asociacion_usuarios_fichas[];
}

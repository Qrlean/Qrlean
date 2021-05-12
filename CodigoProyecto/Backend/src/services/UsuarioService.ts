import { Usuario } from '../models/usuarios.model';
import { Ciudades } from '../models/cuidades.model';
import { Departamento } from '../models/departamentos.models';
import { Tipo_roles } from '../models/tipo_roles.models';
import { Tipo_documento } from '../models/tipo_documento.model';
import bcrypt from 'bcrypt';
import { Helpers } from '../class/Helpers';
import { Ficha } from '../models/ficha.model';
import { Asistencias } from '../models/asistencias.model';
import { Clases } from '../models/clases.model';
import { Asociacion_asignaturas_fichas } from '../models/asociacion_asignaturas_fichas.model';
import { Asociacion_usuarios_fichas } from '../models/asociacion_usuarios_fichas.model';
const Sequelize = require('sequelize');
const op = Sequelize.Op;
export class UsuarioService {
    public readonly id_usuario?: number;
    public readonly nombres_usuario?: string;
    public readonly apellidos_usuario?: string;
    public readonly numero_documento: number;
    public readonly password: string;
    public readonly emailInstitucional?: string;
    public readonly direccion_residencial?: string;
    public readonly telefono_movil?: number;
    public readonly id_ciudad?: number;
    public readonly id_tipo_rol?: number;
    public readonly id_tipo_documento: number;
    constructor(usuario: {
        id_usuario?: number;
        nombres_usuario?: string;
        apellidos_usuario?: string;
        numero_documento: number;
        password: string;
        emailInstitucional?: string;
        direccion_residencial?: string;
        telefono_movil?: number;
        id_ciudad?: number;
        id_tipo_rol?: number;
        id_tipo_documento: number;
    }) {
        this.id_usuario = usuario.id_usuario;
        this.nombres_usuario = usuario.nombres_usuario;
        this.apellidos_usuario = usuario.apellidos_usuario;
        this.numero_documento = usuario.numero_documento;
        this.password = usuario.password;
        this.emailInstitucional = usuario.emailInstitucional;
        this.direccion_residencial = usuario.direccion_residencial;
        this.telefono_movil = usuario.telefono_movil;
        this.id_ciudad = usuario.id_ciudad;
        this.id_tipo_rol = usuario.id_tipo_rol;
        this.id_tipo_documento = usuario.id_tipo_documento;
    }

    static async buscarUsuario(
        where: {},
        password: boolean = false,
    ): Promise<Usuario> {
        try {
            let usuario;
            if (password) {
                usuario = await Usuario.findOne({
                    attributes: [
                        'id_usuario',
                        'nombres_usuario',
                        'apellidos_usuario',
                        'numero_documento',
                        'emailInstitucional',
                        'direccion_residencial',
                        'telefono_movil',
                        'password',
                    ],
                    where,
                    include: [
                        { model: Tipo_roles },
                        { model: Tipo_documento },
                        {
                            model: Ciudades,
                            attributes: ['id_ciudad', 'nombre_ciudad'],
                            include: [Departamento],
                        },
                        {
                            model: Asociacion_usuarios_fichas,
                            include: [
                                {
                                    model: Ficha,
                                    include: [
                                        {
                                            model: Asociacion_asignaturas_fichas,
                                            include: [
                                                {
                                                    model: Clases,
                                                    include: [
                                                        {
                                                            model: Asistencias,
                                                            required: false,
                                                            where: {
                                                                id_aprendiz: {
                                                                    [op.col]:
                                                                        'fichasT.id_usuario',
                                                                },
                                                            },
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                });
            } else {
                usuario = await Usuario.findOne({
                    attributes: [
                        'id_usuario',
                        'nombres_usuario',
                        'apellidos_usuario',
                        'numero_documento',
                        'emailInstitucional',
                        'direccion_residencial',
                        'telefono_movil',
                    ],
                    where,
                    include: [
                        { model: Tipo_roles },
                        { model: Tipo_documento },
                        {
                            model: Ciudades,
                            attributes: ['id_ciudad', 'nombre_ciudad'],
                            include: [Departamento],
                        },
                        {
                            model: Asociacion_usuarios_fichas,
                            include: [
                                {
                                    model: Ficha,
                                    include: [
                                        {
                                            model: Asociacion_asignaturas_fichas,
                                            include: [
                                                {
                                                    model: Clases,
                                                    include: [
                                                        {
                                                            model: Asistencias,
                                                            required: false,
                                                            where: {
                                                                id_aprendiz: {
                                                                    [op.col]:
                                                                        'fichasT.id_usuario',
                                                                },
                                                            },
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                });
            }

            if (!usuario) {
                throw new Error('Usuario no encontrado.');
            }
            return usuario;
        } catch (e) {
            console.log(e);
            throw new Error('Usuario no encontrado.');
        }
    }
    static async buscarUsuarios(
        where: {},
        offset: number = 0,
        orderBy: String = 'numero_documento',
        limit: number = 20,
    ): Promise<{
        count: number;
        rows: Usuario[];
        limit: number;
        offset: number;
        orderBy: String;
    }> {
        if (!isNaN(offset)) {
            offset = parseInt((offset as unknown) as string);
        }
        if (!isNaN(limit)) {
            limit = parseInt((limit as unknown) as string);
        }
        try {
            let usuarios = await Usuario.findAndCountAll({
                subQuery: false,
                attributes: [
                    'id_usuario',
                    'nombres_usuario',
                    'apellidos_usuario',
                    'numero_documento',
                    'emailInstitucional',
                    'direccion_residencial',
                    'telefono_movil',
                ],
                where,
                order: [[`${orderBy}`, 'DESC']],
                limit,
                offset,
                include: [
                    { model: Tipo_roles },
                    { model: Tipo_documento },
                    {
                        model: Ciudades,
                        attributes: ['id_ciudad', 'nombre_ciudad'],
                        include: [Departamento],
                    },
                    {
                        model: Asociacion_usuarios_fichas,
                        include: [
                            {
                                model: Ficha,
                                include: [
                                    {
                                        model: Asociacion_asignaturas_fichas,
                                        include: [
                                            {
                                                model: Clases,
                                                include: [
                                                    {
                                                        model: Asistencias,
                                                        required: false,
                                                        where: {
                                                            id_aprendiz: {
                                                                [op.col]:
                                                                    'fichasT.id_usuario',
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            return { ...usuarios, limit, offset, orderBy };
        } catch (e) {
            console.log(e);
            throw new Error('Error al intentar buscar usuarios.');
        }
    }

    //buscar usuario
    //comparar contraseñas
    //expedir token
    public async login(): Promise<{ usuario: Usuario; token: string }> {
        try {
            let usuario = await UsuarioService.buscarUsuario(
                {
                    numero_documento: this.numero_documento,
                    id_tipo_documento: this.id_tipo_documento,
                },
                true,
            );
            console.log(this.password, usuario.password);
            let bcryptRes = await bcrypt.compare(
                this.password,
                usuario.password,
            );
            if (!bcryptRes) {
                throw new Error('Contraseña incorrecta');
            }
            return {
                usuario,
                token: await Helpers.jwtSign(usuario),
            };
        } catch (e) {
            console.log(e);
            throw new Error('Error al intentar logear al usuario.');
        }
    }
}

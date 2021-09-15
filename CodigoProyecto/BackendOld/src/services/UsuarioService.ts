import { Usuario } from '../models/usuarios.model';
import { Ciudades } from '../models/cuidades.model';
import { Departamento } from '../models/departamentos.models';
import { Tipo_roles } from '../models/tipo_roles.models';
import { Tipo_documento } from '../models/tipo_documento.model';
import bcrypt from 'bcrypt';
import { Helpers } from '../class/Helpers';
import { v4 as uuidv4 } from 'uuid';
import shortId from 'shortid';
import { Asociacion_usuarios_fichas } from '../models/asociacion_usuarios_fichas.model';
import { Ficha } from '../models/ficha.model';
// import { Asistencias } from '../models/asistencias.model';
// import { Clases } from '../models/clases.model';
// import { Asociacion_asignaturas_fichas } from '../models/asociacion_asignaturas_fichas.model';
// import { Asociacion_usuarios_fichas } from '../models/asociacion_usuarios_fichas.model';
// import { Asignatura } from '../models/asignaturas.model';
// import { Op as op } from 'sequelize';

interface UsuarioEdit {
    nombres_usuario: string;
    apellidos_usuario: string;
    numero_documento: number;
    emailInstitucional: string;
    direccion_residencial: string;
    telefono_movil: number;
    id_ciudad: number;
    id_tipo_rol: number;
    id_tipo_documento: number;
}
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
        id_usuario: number;
        nombres_usuario: string;
        apellidos_usuario: string;
        numero_documento: number;
        password: string;
        emailInstitucional: string;
        direccion_residencial: string;
        telefono_movil: number;
        id_ciudad: number;
        id_tipo_rol: number;
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
            let usuario = await Usuario.findOne({
                attributes: password
                    ? [
                          'id_usuario',
                          'nombres_usuario',
                          'apellidos_usuario',
                          'numero_documento',
                          'emailInstitucional',
                          'direccion_residencial',
                          'telefono_movil',
                          'password',
                      ]
                    : [
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
                                // include: [
                                //                 {
                                //                     model: Asociacion_asignaturas_fichas,
                                //                     include: [
                                //                         instructor
                                //                             ? {
                                //                                   model: Clases,
                                //                                   include: [
                                //                                       {
                                //                                           model: Asistencias,
                                //                                           required: false,
                                //                                           where: {
                                //                                               id_aprendiz: {
                                //                                                   [op.col]:
                                //                                                       'fichasT.id_usuario',
                                //                                               },
                                //                                           },
                                //                                       },
                                //                                   ],
                                //                               }
                                //                             : {
                                //                                   model: Asignatura,
                                //                               },
                                //                         {
                                //                             model: Asociacion_usuarios_fichas,
                                //                             attributes: [
                                //                                 'id_asociacion_usuario_ficha',
                                //                             ],
                                //                             include: [
                                //                                 {
                                //                                     model: Usuario,
                                //                                     attributes: [
                                //                                         'id_usuario',
                                //                                         'nombres_usuario',
                                //                                         'apellidos_usuario',
                                //                                         'numero_documento',
                                //                                         'emailInstitucional',
                                //                                         'direccion_residencial',
                                //                                         'telefono_movil',
                                //                                     ],
                                //                                     include: [
                                //                                         {
                                //                                             model: Tipo_roles,
                                //                                         },
                                //                                         {
                                //                                             model: Tipo_documento,
                                //                                         },
                                //                                         {
                                //                                             model: Ciudades,
                                //                                             attributes: [
                                //                                                 'id_ciudad',
                                //                                                 'nombre_ciudad',
                                //                                             ],
                                //                                             include: [
                                //                                                 Departamento,
                                //                                             ],
                                //                                         },
                                //                                     ],
                                //                                 },
                                //                             ],
                                //                         },
                                //                         {
                                //                             model: Clases,
                                //                             include: [
                                //                                 {
                                //                                     model: Asistencias,
                                //                                 },
                                //                             ],
                                //                         },
                                //                     ],
                                //                 },
                                //             ],
                            },
                        ],
                    },
                ],
            });
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
                order: [[`${orderBy}`, 'ASC']],
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
                                // include: [
                                //     {
                                //         model: Asociacion_asignaturas_fichas,
                                //         include: [
                                //             {
                                //                 model: Clases,
                                //                 include: [
                                //                     {
                                //                         model: Asistencias,
                                //                         required: false,
                                //                         where: {
                                //                             id_aprendiz: {
                                //                                 [op.col]:
                                //                                     'fichasT.id_usuario',
                                //                             },
                                //                         },
                                //                     },
                                //                 ],
                                //             },
                                //         ],
                                //     },
                                // ],
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

    //logearse
    static async login(
        numero_documento: number,
        id_tipo_documento: number,
        password: string,
    ): Promise<{ usuario: Usuario; token: string }> {
        try {
            let usuario = await UsuarioService.buscarUsuario(
                {
                    numero_documento: numero_documento,
                    id_tipo_documento: id_tipo_documento,
                },
                true,
            );
            // console.log(password, usuario.password);
            let bcryptRes = await bcrypt.compare(password, usuario.password);
            if (!bcryptRes) {
                throw new Error('Contraseña incorrecta');
            }
            usuario = await UsuarioService.buscarUsuario(
                {
                    numero_documento: numero_documento,
                    id_tipo_documento: id_tipo_documento,
                },
                false,
            );
            return {
                usuario,
                token: await Helpers.jwtSign(usuario),
            };
        } catch (e) {
            console.log(e);
            throw new Error('Error al intentar logear al usuario.');
        }
    }
    public async registrarUsuario(): Promise<any> {
        try {
            let password = shortId.generate();
            console.log(password);
            let passwordHash = await bcrypt.hash(password, 10);
            let newUsuario = new Usuario({
                nombres_usuario: this.nombres_usuario,
                apellidos_usuario: this.apellidos_usuario,
                numero_documento: this.numero_documento,
                emailInstitucional: this.emailInstitucional,
                password: passwordHash,
                direccion_residencial: this.direccion_residencial,
                telefono_movil: this.telefono_movil,
                id_ciudad: this.id_ciudad,
                id_tipo_rol: this.id_tipo_rol,
                id_tipo_documento: this.id_tipo_documento,
            });
            await newUsuario.save();
            if (!newUsuario) {
                throw new Error('Fallo al intentar crear usuario.');
            }
            // console.log(newUsuario.toJSON());
            newUsuario = await UsuarioService.buscarUsuario({
                id_usuario: newUsuario.id_usuario,
            });
            await Helpers.enviarCorreo(
                `Este correo es para avisarte que te han registrado en el sistema de gestión de asistencias QrLean, podrás entrar a tu cuenta con los siguientes datos:
                <br>
                Documento de identidad:${newUsuario.numero_documento}
                <br>
                Tipo de documento de identidad:${newUsuario.documento.nombre_documento}
                <br>
                Contraseña:${password}`,
                '¡Bienvenido a Qrlean!',
                'Creación de cuenta en Qrlean',
                newUsuario.emailInstitucional,
            );
            return newUsuario;
        } catch (e) {
            console.log(e);
            throw new Error('Error al crear el usuario.');
        }
    }
    static async eliminarUsuario(id: number): Promise<boolean> {
        try {
            let usuario: Usuario = await UsuarioService.buscarUsuario({
                id_usuario: id,
            });
            await usuario.destroy();
            return true;
        } catch (e) {
            throw new Error('Error al intentar eliminar el usuario');
        }
    }
    static async editarUsuario(id: number, usuario: UsuarioEdit): Promise<any> {
        try {
            let usuarioEdit = await Usuario.findOne({
                attributes: [
                    'id_usuario',
                    'nombres_usuario',
                    'apellidos_usuario',
                    'numero_documento',
                    'emailInstitucional',
                    'direccion_residencial',
                    'telefono_movil',
                    'id_ciudad',
                    'id_tipo_rol',
                    'id_tipo_documento',
                ],
                where: {
                    id_usuario: id,
                },
            });
            let usuarioTieneFicha = await Asociacion_usuarios_fichas.findOne({
                where: {
                    id_usuario: id,
                },
            });
            if (!usuarioEdit) {
                throw new Error('Error , usuario no encontrado.');
            }
            if (
                usuarioTieneFicha &&
                parseInt((usuario['id_tipo_rol'] as unknown) as string) !==
                    usuarioEdit.id_tipo_rol
            ) {
                throw new Error(
                    'El usuario no puede ser editado si se encuentra asociado a una ficha y se le intenta cambiar el rol',
                );
            }
            let usuarioEditCont: boolean = false;
            // console.log(usuario, usuarioEdit);
            Object.keys({
                nombres_usuario: '',
                apellidos_usuario: '',
                numero_documento: 1,
                emailInstitucional: '',
                direccion_residencial: '',
                telefono_movil: 1,
                id_ciudad: 1,
                id_tipo_rol: 1,
                id_tipo_documento: 1,
            }).map((value) => {
                if (!isNaN(<any>usuario[value as keyof UsuarioEdit])) {
                    (<any>usuario[value as keyof UsuarioEdit]) = parseInt(
                        <string>(<any>usuario[value as keyof UsuarioEdit]),
                    );
                }
                if (
                    <string>(<any>usuarioEdit![value as keyof UsuarioEdit]) ===
                        <any>usuario[value as keyof UsuarioEdit] &&
                    <any>usuario[value as keyof UsuarioEdit]
                ) {
                    return;
                } else {
                    (<any>usuarioEdit![value as keyof UsuarioEdit]) = <any>(
                        usuario[value as keyof UsuarioEdit]
                    );

                    usuarioEditCont = true;
                }
            });

            if (usuarioEditCont) {
                let password = uuidv4();
                let passwordHash = await bcrypt.hash(password, 10);
                usuarioEdit.password = passwordHash;
                let usuarioEditado = await usuarioEdit.save();

                usuarioEditado = await UsuarioService.buscarUsuario({
                    id_usuario: usuarioEditado.id_usuario,
                });
                // console.log(usuarioEdit.toJSON());
                // console.log(usuarioEditado.toJSON());
                await Helpers.enviarCorreo(
                    `Este correo es para avisarte que han editado tus datos en el sistema de gestión de asistencias QrLean, podrás entrar a tu cuenta con los siguientes datos:
                    <br>
                    Documento de identidad:${usuarioEditado.numero_documento}
                    <br>
                    Tipo de documento de identidad:${usuarioEditado.documento.nombre_documento}
                    <br>
                    Contraseña:${password}`,
                    '¡Bienvenido a Qrlean!',
                    'Creación de cuenta en Qrlean',
                    usuarioEditado.emailInstitucional,
                );
                return usuarioEditado;
            } else {
                throw new Error(
                    'Error, los datos enviados son exactamente los que ya posee el usuario.',
                );
            }
        } catch (e) {
            throw new Error((e as Error).message);
        }
    }
}

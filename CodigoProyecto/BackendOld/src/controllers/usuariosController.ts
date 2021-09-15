import { Request, Response } from 'express';
import Controller, { Methods } from '../class/Controller';
import { body, param, query } from 'express-validator';
import { UsuarioService } from '../services/UsuarioService';
import { Usuario } from '../models/usuarios.model';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
export class UsuariosController extends Controller {
    path = '/usuarios';
    routes = [
        {
            path: '/registrar',
            method: Methods.POST,
            handler: this.registrar,
            localMiddleware: [
                body('nombres_usuario')
                    .matches(
                        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                    )
                    .withMessage(
                        'El campo "nombres" debería tener solo caracteres alfabéticos , espacios y tildes.',
                    )
                    .isLength({ min: 5, max: 30 })
                    .withMessage(
                        'El campo "nombres" debería estar dentro del rango de los 5 a 30 caracteres.',
                    )
                    .trim(),
                body('apellidos_usuario')
                    .matches(
                        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                    )
                    .withMessage(
                        'El campo "apellidos" debería tener solo caracteres alfabéticos , espacios y tildes.',
                    )
                    .isLength({ min: 5, max: 30 })
                    .withMessage(
                        'El campo "apellidos" debería estar dentro del rango de los 5 a 30 caracteres.',
                    )
                    .trim(),
                body('numero_documento')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "numero de documento" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 4, max: 20 })
                    .withMessage(
                        'El campo "numero de documento" debería estar dentro del rango de los 4 a 20 caracteres.',
                    )
                    .custom(async (value) => {
                        try {
                            let resUser = await Usuario.findOne({
                                where: { numero_documento: value },
                            });
                            if (resUser) {
                                return Promise.reject(
                                    'El numero de documento enviado ya esta en uso por otra persona',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    })
                    .trim(),
                body('emailInstitucional')
                    .isEmail()
                    .withMessage(
                        'El campo "email - correo electrónico" debería coincidir con el formato de un correo electrónico prueba@dominio.com.',
                    )
                    .custom(async (value) => {
                        try {
                            let resUser = await Usuario.findOne({
                                where: { emailInstitucional: value },
                            });
                            if (resUser) {
                                return Promise.reject(
                                    'El correo enviado ya esta en uso por otra persona',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    })
                    .trim()
                    .normalizeEmail(),
                body('id_tipo_documento')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "tipo de documento" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 1, max: 1 })
                    .withMessage(
                        'El campo "tipo de documento" debería estar dentro del rango de los 1 a 1 caracteres, (probablemente este vació).',
                    )
                    .trim(),
                body('id_tipo_rol')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "tipo de rol" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 1, max: 1 })
                    .withMessage(
                        'El campo "tipo de rol" debería estar dentro del rango de los 1 a 1 caracteres, (probablemente este vació).',
                    )
                    .trim(),
                body('id_ciudad')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "ciudad" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 1, max: 11 })
                    .withMessage(
                        'El campo "ciudad" debería estar dentro del rango de los 1 a 11 caracteres, (probablemente este vació).',
                    )
                    .trim(),
                body('direccion_residencial')
                    .matches(/^[\x00-\xFC]*$/)
                    .withMessage(
                        'El campo "dirección residencial" debería tener solo caracteres alfabéticos , espacios y tildes.',
                    )
                    .isLength({ min: 5, max: 60 })
                    .withMessage(
                        'El campo "dirección residencial" debería estar dentro del rango de los 5 a 60 caracteres.',
                    )
                    .trim(),
                body('telefono_movil')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "teléfono movil" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 5, max: 11 })
                    .withMessage(
                        'El campo "teléfono movil" debería estar dentro del rango de los 5 a 11 caracteres.',
                    )
                    .trim(),
            ],
        },
        {
            path: '/',
            method: Methods.GET,
            handler: this.getUsuarios,
            localMiddleware: [
                query('offset')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo offset debería tener solo caracteres numéricos.',
                    )
                    .trim()
                    .optional(),
                query('limit')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo limit debería tener solo caracteres numéricos.',
                    )
                    .trim()
                    .optional(),
                query('order').trim().optional(),
            ],
        },
        {
            path: '/search',
            method: Methods.GET,
            handler: this.queryUsuario,
            localMiddleware: [
                query('offset')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo offset debería tener solo caracteres numéricos.',
                    )
                    .trim()
                    .optional(),
                query('limit')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo limit debería tener solo caracteres numéricos.',
                    )
                    .trim()
                    .optional(),
                query('order').trim().optional(),
                query('searchBy')
                    .custom(async (value) => {
                        let campos = [
                            'nombres_usuario',
                            'apellidos_usuario',
                            'numero_documento',
                            'emailInstitucional',
                            'direccion_residencial',
                            'telefono_movil',
                            'id_ciudad',
                            'id_tipo_rol',
                            'id_tipo_documento',
                        ];
                        if (campos.indexOf(value) <= -1) {
                            return Promise.reject(
                                `El campo por el cual se debe buscar no es valido, debería estar dentro de estos (${campos.join(
                                    ' - ',
                                )})`,
                            );
                        }
                    })
                    .trim(),

                query('query').trim(),
            ],
        },
        {
            path: '/:id',
            method: Methods.GET,
            handler: this.getUsuario,
            localMiddleware: [
                param('id')
                    .isAlphanumeric()
                    .withMessage(
                        'El id solo debe contener caracteres alfanuméricos',
                    )
                    .custom(async (value) => {
                        try {
                            let resUser = await Usuario.findOne({
                                where: { id_usuario: value },
                            });
                            if (!resUser) {
                                return Promise.reject(
                                    'El id enviado no corresponde a una persona',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
            ],
        },
        {
            path: '/eliminar/:id',
            method: Methods.DELETE,
            handler: this.deleteUsuario,
            localMiddleware: [
                param('id')
                    .isAlphanumeric()
                    .withMessage(
                        'El id solo debe contener caracteres alfanuméricos',
                    )
                    .custom(async (value) => {
                        try {
                            let resUser = await Usuario.findOne({
                                where: { id_usuario: value },
                            });
                            if (!resUser) {
                                return Promise.reject(
                                    'El id enviado no corresponde a una persona',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
            ],
        },
        {
            path: '/editar/:id',
            method: Methods.PUT,
            handler: this.editUsuario,
            localMiddleware: [
                param('id')
                    .isAlphanumeric()
                    .withMessage(
                        'El id solo debe contener caracteres alfanuméricos',
                    )
                    .custom(async (value) => {
                        try {
                            let resUser = await Usuario.findOne({
                                where: { id_usuario: value },
                            });
                            if (!resUser) {
                                return Promise.reject(
                                    'El id enviado no corresponde a una persona',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
                body('nombres_usuario')
                    .matches(
                        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                    )
                    .withMessage(
                        'El campo "nombres" debería tener solo caracteres alfabéticos , espacios y tildes.',
                    )
                    .isLength({ min: 5, max: 30 })
                    .withMessage(
                        'El campo "nombres" debería estar dentro del rango de los 5 a 30 caracteres.',
                    )
                    .trim(),
                body('apellidos_usuario')
                    .matches(
                        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                    )
                    .withMessage(
                        'El campo "apellidos" debería tener solo caracteres alfabéticos , espacios y tildes.',
                    )
                    .isLength({ min: 5, max: 30 })
                    .withMessage(
                        'El campo "apellidos" debería estar dentro del rango de los 5 a 30 caracteres.',
                    )
                    .trim(),
                body('numero_documento')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "numero de documento" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 4, max: 20 })
                    .withMessage(
                        'El campo "numero de documento" debería estar dentro del rango de los 4 a 20 caracteres.',
                    )
                    .trim(),
                body('emailInstitucional')
                    .isEmail()
                    .withMessage(
                        'El campo "email - correo electrónico" debería coincidir con el formato de un correo electrónico prueba@dominio.com.',
                    )
                    .trim()
                    .normalizeEmail(),
                body('id_tipo_documento')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "tipo de documento" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 1, max: 1 })
                    .withMessage(
                        'El campo "tipo de documento" debería estar dentro del rango de los 1 a 1 caracteres, (probablemente este vació).',
                    )
                    .trim(),
                body('id_tipo_rol')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "tipo de rol" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 1, max: 1 })
                    .withMessage(
                        'El campo "tipo de rol" debería estar dentro del rango de los 1 a 1 caracteres, (probablemente este vació).',
                    )
                    .trim(),
                body('id_ciudad')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "ciudad" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 1, max: 11 })
                    .withMessage(
                        'El campo "ciudad" debería estar dentro del rango de los 1 a 11 caracteres, (probablemente este vació).',
                    )
                    .trim(),
                body('direccion_residencial')
                    .matches(/^[\x00-\xFC]*$/)
                    .withMessage(
                        'El campo "dirección residencial" debería tener solo caracteres alfabéticos , espacios y tildes.',
                    )
                    .isLength({ min: 5, max: 60 })
                    .withMessage(
                        'El campo "dirección residencial" debería estar dentro del rango de los 5 a 60 caracteres.',
                    )
                    .trim(),
                body('telefono_movil')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "teléfono movil" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 5, max: 11 })
                    .withMessage(
                        'El campo "teléfono movil" debería estar dentro del rango de los 5 a 11 caracteres.',
                    )
                    .trim(),
            ],
        },
    ];

    //registrar usuario
    async registrar(req: Request, res: Response): Promise<any> {
        try {
            console.log(req.body);
            let usuario = new UsuarioService({
                id_usuario: req.body.id_usuario,
                nombres_usuario: req.body.nombres_usuario,
                apellidos_usuario: req.body.apellidos_usuario,
                numero_documento: req.body.numero_documento,
                password: req.body.password,
                emailInstitucional: req.body.emailInstitucional,
                direccion_residencial: req.body.direccion_residencial,
                telefono_movil: req.body.telefono_movil,
                id_ciudad: req.body.id_ciudad,
                id_tipo_rol: req.body.id_tipo_rol,
                id_tipo_documento: req.body.id_tipo_documento,
            });
            console.log(usuario);
            usuario = await usuario.registrarUsuario();
            if (usuario) {
                return super.sendSuccess(res, 'Usuario creado con éxito.', {
                    usuario,
                });
            }
        } catch (e) {
            console.log(e);
            return super.sendE400(
                res,
                'Fallo al crear usuario , intente de nuevo más tarde',
            );
        }
    }

    //buscar un usuario
    async queryUsuario(_req: Request, res: Response) {
        try {
            return super.sendSuccess(
                res,
                'Se obtuvo los usuarios correctamente.',
                await UsuarioService.buscarUsuarios(
                    {
                        [(_req.query.searchBy as unknown) as string]: {
                            [Op.like]: `%${_req.query.query}%`,
                        },
                    },
                    (_req.query.offset as unknown) as number,
                    (_req.query.order as unknown) as string,
                    (_req.query.limit as unknown) as number,
                ),
            );
        } catch (e) {
            console.log(e);
            return super.sendE400(
                res,
                'Error al intentar buscar los usuarios, intente de nuevo más tarde.',
            );
        }
    }

    //Obtener todos los usuarios
    async getUsuarios(_req: Request, res: Response) {
        try {
            return super.sendSuccess(
                res,
                'Se obtuvo los usuarios correctamente.',
                {
                    usuarios: await UsuarioService.buscarUsuarios(
                        {},
                        (_req.query.offset as unknown) as number,
                        (_req.query.order as unknown) as string,
                        (_req.query.limit as unknown) as number,
                    ),
                },
            );
        } catch (e) {
            console.log(e);
            return super.sendE400(
                res,
                'Error al intentar buscar los usuarios, intente de nuevo más tarde.',
            );
        }
    }

    //Obtener usuario por id
    async getUsuario(req: Request, res: Response) {
        try {
            let usuario = await UsuarioService.buscarUsuario({
                id_usuario: req.params.id,
            });
            return super.sendSuccess(res, 'Se obtuvo el usuario con exito.', {
                usuario,
            });
        } catch (e) {
            console.log(e);
            return super.sendE400(
                res,
                'Error al intentar buscar el usuario,intente de nuevo más tarde.',
            );
        }
    }

    //Eliminar usuario
    async deleteUsuario(req: Request, res: Response) {
        try {
            await UsuarioService.eliminarUsuario(
                (req.params.id as unknown) as number,
            );
            return super.sendSuccess(res, 'Usuario desactivado correctamente');
        } catch (e) {
            console.log(e);
            return super.sendE400(
                res,
                'Error al intentar eliminar el usuario,intente de nuevo más tarde.',
            );
        }
    }

    //Editar usuario
    async editUsuario(req: Request, res: Response) {
        try {
            let usuario = await UsuarioService.editarUsuario(
                (req.params.id as unknown) as number,
                {
                    nombres_usuario: req.body.nombres_usuario,
                    apellidos_usuario: req.body.apellidos_usuario,
                    numero_documento: (req.body
                        .numero_documento as unknown) as number,
                    emailInstitucional: req.body.emailInstitucional,
                    direccion_residencial: req.body.direccion_residencial,
                    telefono_movil: (req.body
                        .telefono_movil as unknown) as number,
                    id_ciudad: (req.body.id_ciudad as unknown) as number,
                    id_tipo_rol: (req.body.id_tipo_rol as unknown) as number,
                    id_tipo_documento: (req.body
                        .id_tipo_documento as unknown) as number,
                },
            );
            return super.sendSuccess(res, 'Usuario editado con éxito.', {
                usuario,
            });
        } catch (e) {
            // console.log(e.message);
            return super.sendE400(res, (e as Error).message as string);
        }
    }
}

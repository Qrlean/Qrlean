import { Request, Response } from 'express';
import Controller, { Methods } from '../class/Controller';
import { body, param, validationResult } from 'express-validator';
import { UsuarioService } from '../services/UsuarioService';
import { AdministradorService } from '../services/AdministradorService';
import { Usuario } from '../models/usuarios.model';
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
                    .trim()
                    .optional(),
                body('telefono_movil')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "teléfono movil" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 5, max: 11 })
                    .withMessage(
                        'El campo "teléfono movil" debería estar dentro del rango de los 5 a 11 caracteres.',
                    )
                    .trim()
                    .optional(),
            ],
        },
        {
            path: '/',
            method: Methods.GET,
            handler: this.getUsuarios,
            localMiddleware: [],
        },
        {
            path: '/:id',
            method: Methods.GET,
            handler: this.getUsuario,
            localMiddleware: [],
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

    async registrar(req: Request, res: Response): Promise<any> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
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
            usuario = await AdministradorService.registrarUsuario(usuario);
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

    async getUsuarios(_req: Request, res: Response) {
        try {
            return super.sendSuccess(
                res,
                'Se obtuvo los usuarios correctamente.',
                {
                    usuarios: await UsuarioService.buscarUsuarios({}),
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
    async deleteUsuario(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
        try {
            await AdministradorService.eliminarUsuario(
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
    async editUsuario(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
        try {
            let usuario = await AdministradorService.editarUsuario(
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
            return super.sendSuccess(res, 'Usuario editado con exito.', {
                usuario,
            });
        } catch (e) {
            console.log(e);
            return super.sendE400(
                res,
                'Error al intentar editar el usuario, intente de nuevo más tarde.',
            );
        }
    }
}

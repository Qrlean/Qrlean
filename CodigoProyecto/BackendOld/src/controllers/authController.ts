import { Request, Response } from 'express';
import Controller, { Methods } from '../class/Controller';
import { UsuarioService } from '../services/UsuarioService';
import { body } from 'express-validator';
import { Helpers } from '../class/Helpers';
import { Tipo_documento } from '../models/tipo_documento.model';
export class AuthController extends Controller {
    path = '/autentificacion';
    routes = [
        {
            path: '/login',
            method: Methods.POST,
            handler: this.login,
            localMiddleware: [
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
                body('id_tipo_documento')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El campo "tipo de documento" debería tener solo caracteres numéricos.',
                    )
                    .isLength({ min: 1, max: 1 })
                    .withMessage(
                        'El campo "tipo de documento" debería estar dentro del rango de los 1 a 1 caracteres, (probablemente este vació).',
                    )
                    .trim()
                    .custom(async (value) => {
                        try {
                            let documento = await Tipo_documento.findOne({
                                where: { id_tipo_documento: value },
                            });
                            if (!documento) {
                                return Promise.reject(
                                    'El id enviado no corresponde a un documento',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
                body('password')
                    .matches(/^[\x00-\xFC]*$/)
                    .withMessage(
                        'El campo "password - contraseña" debería tener solo caracteres alfanuméricos , tildes y caracteres especiales.',
                    )
                    .isLength({ min: 5, max: 150 })
                    .withMessage(
                        'El campo "password - contraseña" debería estar dentro del rango de los 5 a 150 caracteres',
                    )
                    .trim(),
            ],
        },
        {
            path: '/verificar-token',
            method: Methods.POST,
            handler: this.verificarToken,
            localMiddleware: [
                body('token')
                    .isJWT()
                    .withMessage('Deberías enviar un token valido')
                    .trim(),
            ],
        },
    ];
    async login(req: Request, res: Response): Promise<any> {
        try {
            let { token, usuario } = await UsuarioService.login(
                req.body.numero_documento,
                req.body.id_tipo_documento,
                req.body.password,
            );
            return super.sendSuccess(res, 'Usuario logeado correctamente', {
                token,
                usuario,
            });
        } catch (e) {
            return super.sendE400(
                res,
                'Error al intentar logear al usuario, intente con otro documento , tipo de documento o contraseña.',
            );
        }
    }
    async verificarToken(req: Request, res: Response): Promise<any> {
        try {
            let decoded = await Helpers.jwtVerify(req.body.token);
            let usuario = await UsuarioService.buscarUsuario({
                id_usuario: decoded.usuario.id_usuario,
            });
            return super.sendSuccess(res, 'Se valido correctamente el token.', {
                token: await Helpers.jwtSign(usuario),
                usuario,
            });
        } catch (e) {
            console.log(e);
            return super.sendE400(
                res,
                'Error al verificar token , probablemente el token sea invalido o expiro.',
            );
        }
    }
}

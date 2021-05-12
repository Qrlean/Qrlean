import Controller from '../class/Controller';
import { Methods } from '../class/Controller';
import { Request, Response } from 'express';
import { FichaService } from '../services/FichaService';
import { body, query, validationResult, param } from 'express-validator';
import { Programa } from '../models/programa.model';
import { Ficha } from '../models/ficha.model';
import { Usuario } from '../models/usuarios.model';
export class FichasController extends Controller {
    path = '/fichas';
    routes = [
        {
            path: '/',
            method: Methods.GET,
            handler: this.getFichas,
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
            path: '/:id',
            method: Methods.GET,
            handler: this.getFicha,
            localMiddleware: [
                param('id')
                    .isAlphanumeric()
                    .withMessage(
                        'El id solo debe contener caracteres alfanuméricos',
                    )
                    .custom(async (value) => {
                        try {
                            let ficha = await Ficha.findOne({
                                where: { if_ficha: value },
                            });
                            if (!ficha) {
                                return Promise.reject(
                                    'El id enviado no corresponde a una ficha',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
            ],
        },
        {
            path: '/crear',
            method: Methods.POST,
            handler: this.crearFicha,
            localMiddleware: [
                body('id_programa')
                    .isAlphanumeric()
                    .withMessage(
                        'El id del programa solo debe contener caracteres alfanuméricos',
                    )
                    .custom(async (value) => {
                        try {
                            let programa = await Programa.findOne({
                                where: { id_programa: value },
                            });
                            if (!programa) {
                                return Promise.reject(
                                    'El id enviado no corresponde a un programa',
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
            handler: this.editarFicha,
            localMiddleware: [
                param('id')
                    .isAlphanumeric()
                    .withMessage(
                        'El id solo debe contener caracteres alfanuméricos',
                    )
                    .custom(async (value) => {
                        try {
                            let resFicha = await Ficha.findOne({
                                where: { id_ficha: value },
                            });
                            if (!resFicha) {
                                return Promise.reject(
                                    'El id enviado no corresponde a una ficha',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
                body('id_programa')
                    .isAlphanumeric()
                    .withMessage(
                        'El id del programa solo debe contener caracteres alfanuméricos',
                    )
                    .custom(async (value) => {
                        try {
                            let programa = await Programa.findOne({
                                where: { id_programa: value },
                            });
                            if (!programa) {
                                return Promise.reject(
                                    'El id enviado no corresponde a un programa',
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
            handler: this.eliminarFicha,
            localMiddleware: [
                param('id')
                    .isAlphanumeric()
                    .withMessage(
                        'El id solo debe contener caracteres alfanuméricos',
                    )
                    .custom(async (value) => {
                        try {
                            let resFicha = await Ficha.findOne({
                                where: { id_ficha: value },
                            });
                            if (!resFicha) {
                                return Promise.reject(
                                    'El id enviado no corresponde a una ficha',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
            ],
        },
        {
            path: '/asociar-aprendiz/',
            method: Methods.POST,
            handler: this.asociarAprendiz,
            localMiddleware: [
                body('id_aprendiz')
                    .isNumeric()
                    .withMessage(
                        'El id solo debe contener caracteres numéricos',
                    )
                    .custom(async (value) => {
                        try {
                            let usuario = await Usuario.findOne({
                                where: { id_usuario: value },
                            });
                            if (!usuario) {
                                return Promise.reject(
                                    'El id enviado no corresponde a un usuario',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
                body('id_ficha')
                    .isNumeric()
                    .withMessage(
                        'El id de la ficha solo debe contener caracteres numéricos',
                    )
                    .custom(async (value) => {
                        try {
                            let ficha = await Ficha.findOne({
                                where: { id_ficha: value },
                            });
                            if (!ficha) {
                                return Promise.reject(
                                    'El id enviado no corresponde a una fichas',
                                );
                            }
                        } catch (e) {
                            return Promise.reject('Error, intente más tarde.');
                        }
                    }),
            ],
        },
    ];
    async getFicha(_req: Request, res: Response) {
        const errors = validationResult(_req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
        try {
            super.sendSuccess(res, 'Se obtuvo las fichas correctamente.', {
                fichas: await FichaService.buscarFicha({
                    id_ficha: _req.params.id,
                }),
            });
        } catch (e) {
            console.log(e);
            super.sendE400(res, 'Error al intentar obtener las fichas');
        }
    }
    async getFichas(_req: Request, res: Response) {
        const errors = validationResult(_req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
        try {
            super.sendSuccess(res, 'Se obtuvo las fichas correctamente.', {
                fichas: await FichaService.buscarFichas(
                    {},
                    (_req.query.offset as unknown) as number,
                    (_req.query.order as unknown) as string,
                    (_req.query.limit as unknown) as number,
                ),
            });
        } catch (e) {
            console.log(e);
            super.sendE400(res, 'Error al intentar obtener las fichas');
        }
    }

    async crearFicha(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
        try {
            let nuevaFicha = new FichaService(req.body.id_programa);
            let ficha = await nuevaFicha.crearFicha();
            ficha = await FichaService.buscarFicha({
                id_ficha: ficha.id_ficha,
            });
            super.sendSuccess(res, 'Ficha creada con éxito.', { ficha });
        } catch (e) {
            console.log(e);
            super.sendE400(res, 'Error al intentar crear la ficha.');
        }
    }
    async editarFicha(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
        try {
            let ficha = await FichaService.editarFicha(
                (req.params.id as unknown) as number,
                {
                    id_ficha: <number>(<any>req.params.id),
                    id_programa: req.body.id_programa,
                },
            );
            super.sendSuccess(res, 'Ficha editada con éxito,', { ficha });
        } catch (e) {
            console.log(e);
            super.sendE400(res, 'Error al intentar editar la ficha.');
        }
    }
    async eliminarFicha(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
        try {
            await FichaService.eliminarFicha(
                (req.params.id as unknown) as number,
            );
            return super.sendSuccess(res, 'Ficha eliminada correctamente');
        } catch (e) {
            console.log(e);
            super.sendE400(res, 'Error al intentar eliminar la ficha.');
        }
    }

    async asociarAprendiz(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return super.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        }
        try {
            let ficha = await FichaService.asociarAprendiz(
                req.body.id_aprendiz,
                req.body.id_ficha,
            );
        } catch (e) {
            console.log(e);
            super.sendE400(res, 'Error al intentar asociar aprendiz.');
        }
    }
}

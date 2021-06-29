import Controller from '../class/Controller';
import { Methods } from '../class/Controller';
import { Response, Request } from 'express';
import { body } from 'express-validator';
import { AsistenciasService } from '../services/AsistenciasService';
// import { AsistenciasService } from '../services/AsistenciasService';

export class AsistenciasController extends Controller {
    path = '/asistencias/';
    routes = [
        {
            path: '/firmar/instructor',
            handler: this.firmarAsistenciaInstructor,
            method: Methods.GET,
            localMiddleware: [
                body('id_clase')
                    .isNumeric()
                    .withMessage(
                        'El id de la clase debiera solo contener caracteres numéricos.',
                    ),
                body('aprendices')
                    .isArray()
                    .withMessage('El campo aprendices debería ser un array'),
                body('aprendices.*.id_tipo_asistencia')
                    .isNumeric()
                    .withMessage(
                        'El id del tipo de asistencia debiera solo contener caracteres numéricos.',
                    ),
                body('aprendices.*.id_aprendiz')
                    .isNumeric()
                    .withMessage(
                        'El id del aprendiz debiera solo contener caracteres numéricos.',
                    ),
                body('aprendices.*.id_solicitud_cambio_asistencia')
                    .isNumeric()
                    .withMessage(
                        'El id de la solicitud de cambio de asistencia debiera solo contener caracteres numéricos.',
                    )
                    .optional({ nullable: true }),
            ],
        },
        {
            path: '/firmar/aprendiz',
            handler: this.firmarAsistenciaAprendiz,
            method: Methods.POST,
            localMiddleware: [
                body('id_clase')
                    .isNumeric()
                    .withMessage(
                        'El id de la clase debiera solo contener caracteres numéricos.',
                    ),
                body('id_aprendiz')
                    .isNumeric()
                    .withMessage(
                        'El id del aprendiz debiera solo contener caracteres numéricos.',
                    ),
            ],
        },
    ];

    async firmarAsistenciaInstructor(req: Request, res: Response) {
        try {
            console.log(req.body.id_clase);
            let asistencias = req.body.aprendices.map(
                async (aprendiz: {
                    id_tipo_asistencia: number;
                    id_aprendiz: number;
                    id_solicitud_cambio_asistencia?: number;
                }) => {
                    let asistenciaAprendiz = new AsistenciasService(
                        req.body.id_clase,
                        aprendiz.id_tipo_asistencia,
                        aprendiz.id_aprendiz,
                        aprendiz.id_solicitud_cambio_asistencia,
                    );
                    console.log(asistenciaAprendiz);
                    return await asistenciaAprendiz.registrarAsistenciaInstructor();
                },
            );

            return super.sendSuccess(res, 'Lista firmada correctamente.', {
                ok: true,
                asistencias: await Promise.all(asistencias),
            });
        } catch (e) {
            console.log(e);
            return super.sendE400(
                res,
                'Error al intentar registrar la asistencia.',
            );
        }
    }
    async firmarAsistenciaAprendiz(req: Request, res: Response) {
        try {
            let asistenciaAprendiz = new AsistenciasService(
                req.body.id_clase,
                1,
                req.body.id_aprendiz,
                undefined,
            );
            return super.sendSuccess(res, 'Asistencia firmada correctamente.', {
                ok: true,
                asistencia: await asistenciaAprendiz.registrarAsistenciaAprendiz(),
            });
        } catch (e) {
            console.log(e);
            return super.sendE400(res, (e as Error).message);
        }
    }
}

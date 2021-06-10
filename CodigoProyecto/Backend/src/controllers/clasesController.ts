import Controller from '../class/Controller';
import { Methods } from '../class/Controller';
import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import moment from 'moment';
import { sequelize } from '../config';
import { ClasesService } from '../services/ClasesService';
const { QueryTypes } = require('sequelize');
export class ClasesController extends Controller {
    path = '/clases';
    //nombre_clase
    //dia
    //hora_inicio
    //hora_final
    //id_asociacion_asignatura_ficha
    routes = [
        {
            path: '/crear',
            method: Methods.POST,
            handler: this.crearClase,
            localMiddleware: [
                body('nombre_clase')
                    .trim()
                    .matches(
                        /^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1.!?¿¡,;]+(\s*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1.!?¿¡,;]*)*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1.!?¿¡,;]+$/,
                    )
                    .withMessage(
                        'El nombre de la clase debería tener solo letras , espacios y números.',
                    ),
                body('dia').isDate(),
                body('hora_inicio')
                    .matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/)
                    .withMessage(
                        'La hora de inicio debería coincidir con el siguiente formato 12:30:60 | 02:50:60 (hh:mm:ss).',
                    ),
                body('hora_final')
                    .matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/)

                    .withMessage(
                        'La hora de inicio debería coincidir con el siguiente formato 12:30:60 | 02:50:60 (hh:mm:ss).',
                    ),
                body('id_asociacion_asignatura_ficha')
                    .matches(/^\d+$/)
                    .withMessage(
                        'El id_asociacion_asignatura_ficha debería ser un numero.',
                    ),
            ],
        },
        {
            path: '/eliminar/:id_clase',
            method: Methods.DELETE,
            handler: this.eliminarClase,
            localMiddleware: [
                param('id_clase')
                    .isNumeric()
                    .withMessage(
                        'El id de la clase deberia solo contener caracteres numericos.',
                    )
                    .trim(),
            ],
        },
    ];
    async eliminarClase(req: Request, res: Response) {
        try {
            await ClasesService.eliminarClase(
                (req.params.id_clase as unknown) as number,
            );
            return super.sendSuccess(res, 'Clase eliminada con éxito.');
        } catch (e) {
            console.log(e);
            super.sendE400(res, 'Error al intentar eliminar la clase.');
        }
    }
    async crearClase(req: Request, res: Response) {
        try {
            req.body.hora_inicio = req.body.hora_inicio.split(':');
            const hora_inicio = moment()
                .utcOffset('-5')
                .hour(req.body.hora_inicio[0])
                .minute(req.body.hora_inicio[1])
                .second(req.body.hora_inicio[2]);

            req.body.hora_final = req.body.hora_final.split(':');
            const hora_final = moment()
                .utcOffset('-5')
                .hour(req.body.hora_final[0])
                .minute(req.body.hora_final[1])
                .second(req.body.hora_final[2]);

            let diaCompletoClaseInicio = moment(req.body.dia)
                .hour((req.body.hora_inicio[0] as unknown) as number)
                .minute((req.body.hora_inicio[1] as unknown) as number)
                .second((req.body.hora_inicio[2] as unknown) as number);

            // let diaCompletoClaseFin = moment(req.body.dia)
            //     .hour((req.body.hora_final[0] as unknown) as number)
            //     .minute((req.body.hora_final[1] as unknown) as number)
            //     .second((req.body.hora_final[2] as unknown) as number);

            //Verificar si la fecha es despues de la fecha actual
            if (diaCompletoClaseInicio.diff(moment(Date.now())) <= 0) {
                throw new Error(
                    'La fecha ingresada no es valida, esta debería ser mas tarde a la fecha actual.',
                );
            }

            //Verifica si la hora de inicio y la hora de final tiene una diferencia de 15 min
            // if (hora_final.diff(hora_inicio) <= 900000) {
            //     throw new Error(
            //         'La hora final debería ser por lo menos 30 minutos mas tarde que la hora inicial.',
            //     );
            // }
            //SELECT * FROM qrlean.clases WHERE (dia = '2021-05-18' AND ('00:50:50' BETWEEN hora_inicio AND hora_final)) OR (dia = '2021-05-18' AND  ('02:51:40' BETWEEN hora_inicio AND hora_final))  OR (dia = '2021-05-18' AND  ('01:50:50' <= hora_final AND '02:20:40' >= hora_inicio))

            let [verificarClaseMismaHora] = await sequelize.query(
                `SELECT * FROM qrlean.clases WHERE (dia = :dia AND (:hora_inicio BETWEEN hora_inicio AND hora_final)) OR (dia = :dia AND  (:hora_final BETWEEN hora_inicio AND hora_final))  OR (dia = :dia AND  (:hora_inicio <= hora_final AND :hora_final >= hora_inicio))`,
                {
                    replacements: {
                        dia: req.body.dia,
                        hora_inicio: req.body.hora_inicio.join(':'),
                        hora_final: req.body.hora_final.join(':'),
                    },
                    type: QueryTypes.SELECT,
                },
            );

            // console.log(verificarClaseMismaHora);
            // Verificar si la clase se cruza con otra clase
            if (
                verificarClaseMismaHora &&
                Object.keys((verificarClaseMismaHora as unknown) as object)
                    .length > 0
            ) {
                throw new Error(
                    'El rango de horas que envió ya se encuentra en uso.',
                );
            }

            let claseNueva = new ClasesService({
                nombre_clase: (req.body.nombre_clase as unknown) as string,
                dia: (req.body.dia as unknown) as Date,
                hora_inicio: hora_inicio.format('HH:mm:ss'),
                hora_final: hora_final.format('HH:mm:ss'),
                id_asociacion_asignatura_ficha:
                    req.body.id_asociacion_asignatura_ficha,
            });
            let claseNuevaReturn = await claseNueva.CrearClase();
            return super.sendSuccess(res, 'Clase creada con éxito.', {
                clase: claseNuevaReturn,
            });
        } catch (e) {
            console.log(e);
            super.sendE400(res, 'Error al intentar crear la clase.');
        }
    }
}

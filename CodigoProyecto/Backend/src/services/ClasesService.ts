import moment from 'moment';

import scheduler from 'node-schedule';

import { Clases } from '../models/clases.model';
import { Helpers } from '../class/Helpers';
import { Asociacion_asignaturas_fichas } from '../models/asociacion_asignaturas_fichas.model';
import { Ficha } from '../models/ficha.model';
import { Usuario } from '../models/usuarios.model';
import { Asignatura } from '../models/asignaturas.model';
import { Asociacion_usuarios_fichas } from '../models/asociacion_usuarios_fichas.model';
import { Tipo_roles } from '../models/tipo_roles.models';
import { Tipo_documento } from '../models/tipo_documento.model';
import { Ciudades } from '../models/cuidades.model';
import { Departamento } from '../models/departamentos.models';
import { Asistencias } from '../models/asistencias.model';
import { Tipo_asistencias } from '../models/tipo_asistencias.model';

export class ClasesService {
    public readonly nombre_clase: string;
    public readonly dia: Date;
    public readonly hora_inicio: string;
    public readonly hora_final: string;
    public readonly id_asociacion_asignatura_ficha: number;
    public readonly permite_qr: boolean;

    constructor({
        nombre_clase,
        dia,
        hora_inicio,
        hora_final,
        id_asociacion_asignatura_ficha,
        permite_qr = true,
    }: {
        nombre_clase: string;
        dia: Date;
        hora_inicio: string;
        hora_final: string;
        id_asociacion_asignatura_ficha: number;
        permite_qr?: boolean;
    }) {
        this.permite_qr = permite_qr;
        this.nombre_clase = nombre_clase;
        this.dia = dia;
        this.hora_inicio = hora_inicio;
        this.hora_final = hora_final;
        this.id_asociacion_asignatura_ficha = id_asociacion_asignatura_ficha;
    }

    // static async ObtenerClases(where: {}): Promise<any> {}
    static async ObtenerClase(where: {}): Promise<Clases> {
        try {
            let clase = await Clases.findOne({
                where,
                // include: [
                //     {
                //         model: Asociacion_asignaturas_fichas,
                //         include: [
                //             { model: Ficha, include: [{ model: Usuario }] },
                //         ],
                //     },
                // ],
                include: [
                    {
                        model: Asistencias,
                        include: [
                            {
                                model: Tipo_asistencias,
                            },
                            {
                                model: Asociacion_usuarios_fichas,
                                include: [
                                    {
                                        model: Usuario,
                                        attributes: [
                                            'id_usuario',
                                            'nombres_usuario',
                                            'apellidos_usuario',
                                            'numero_documento',
                                            'emailInstitucional',
                                            'direccion_residencial',
                                            'telefono_movil',
                                        ],
                                        include: [
                                            {
                                                model: Tipo_roles,
                                            },
                                            {
                                                model: Tipo_documento,
                                            },
                                            {
                                                model: Ciudades,
                                                attributes: [
                                                    'id_ciudad',
                                                    'nombre_ciudad',
                                                ],
                                                include: [Departamento],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!clase) {
                throw new Error('La clase que busca no existe.');
            }
            return clase;
        } catch (e) {
            throw new Error('Error al intentar obtener clase.');
        }
    }

    public async CrearClase(): Promise<Clases | void> {
        try {
            let claseNueva = new Clases({
                nombre_clase: this.nombre_clase,
                dia: this.dia,
                hora_inicio: this.hora_inicio,
                hora_final: this.hora_final,
                id_asociacion_asignatura_ficha: this
                    .id_asociacion_asignatura_ficha,
                permite_qr: this.permite_qr,
            });
            claseNueva = await claseNueva.save();
            claseNueva = await ClasesService.ObtenerClase({
                id_clase: claseNueva.id_clase,
            });
            let infoCompletaClase = (await Clases.findOne({
                where: {
                    id_clase: claseNueva.id_clase,
                },
                include: [
                    {
                        model: Asociacion_asignaturas_fichas,
                        include: [
                            { model: Asignatura },
                            {
                                model: Ficha,
                                include: [{ model: Usuario }],
                            },
                        ],
                    },
                ],
            })) as Clases;
            if (infoCompletaClase === null) {
                throw new Error('Error al intentar crear clase.');
            }
            // console.log(infoCompletaClase.toJSON());

            let horaInicio = infoCompletaClase.hora_inicio.split(':');
            let horaFinal = infoCompletaClase.hora_final.split(':');
            let diaCompletoClaseInicio = moment(infoCompletaClase.dia)
                .hour((horaInicio[0] as unknown) as number)
                .minute((horaInicio[1] as unknown) as number)
                .second((horaInicio[2] as unknown) as number);
            let diaCompletoClaseFin = moment(infoCompletaClase.dia)
                .hour((horaFinal[0] as unknown) as number)
                .minute((horaFinal[1] as unknown) as number)
                .second((horaFinal[2] as unknown) as number);
            //Aviso email para aprendices 5 min antes de la finalizacion de la clase

            let diaCompletoClaseAviso5Min = moment(infoCompletaClase.dia)
                .hour((horaFinal[0] as unknown) as number)
                .minute(((horaFinal[1] as unknown) as number) - 5)
                .second((horaFinal[2] as unknown) as number)
                .toDate();

            scheduler.scheduleJob(
                `${infoCompletaClase.id_clase.toString()}-sysAviso`,
                diaCompletoClaseAviso5Min,
                () => {
                    infoCompletaClase.asignatura.ficha.usuarios.map(
                        async (usuario) => {
                            if (
                                await Clases.findOne({
                                    where: {
                                        id_clase: infoCompletaClase.id_clase,
                                    },
                                })
                            ) {
                                if (usuario.id_tipo_rol === 3) {
                                    await Helpers.enviarCorreo(
                                        `Aviso: La clase "${infoCompletaClase.nombre_clase}" finalizara en 5 min , apurate.`,
                                        `Aviso clase "${infoCompletaClase.nombre_clase}"`,
                                        `Aviso clase "${infoCompletaClase.nombre_clase}"`,
                                        usuario.emailInstitucional,
                                    );
                                }
                            }
                            return;
                        },
                    );
                },
            );

            //Firma automática de inasistencia de aprendices por sistema , y correspondiente aviso por email
            scheduler.scheduleJob(
                `${infoCompletaClase.id_clase.toString()}-sysInasistencia`,
                diaCompletoClaseFin.toDate(),
                () => {
                    infoCompletaClase.asignatura.ficha.usuarios.map(
                        async (usuario) => {
                            if (
                                await Clases.findOne({
                                    where: {
                                        id_clase: infoCompletaClase.id_clase,
                                    },
                                })
                            ) {
                                let aprendizTieneAsistencia = await Asistencias.findOne(
                                    {
                                        where: {
                                            id_aprendiz:
                                                usuario
                                                    .Asociacion_usuarios_fichas
                                                    .id_asociacion_usuario_ficha,
                                            id_clase: claseNueva.id_clase,
                                        },
                                    },
                                );
                                if (
                                    !aprendizTieneAsistencia &&
                                    usuario.id_tipo_rol === 3
                                ) {
                                    await Asistencias.create({
                                        id_aprendiz:
                                            usuario.Asociacion_usuarios_fichas
                                                .id_asociacion_usuario_ficha,
                                        id_tipo_asistencia: 2,
                                        id_clase: infoCompletaClase.id_clase,
                                    });
                                    await Helpers.enviarCorreo(
                                        `Aviso: El sistema te a colocado una inasistencia en la clase "${infoCompletaClase.nombre_clase}" ya que se a vencido el tiempo para firmarla, si crees que es un error contacta con el instructor de la clase.`,
                                        `Advertencia inasistencia clase "${infoCompletaClase.nombre_clase}"`,
                                        `Advertencia inasistencia clase "${infoCompletaClase.nombre_clase}"`,
                                        usuario.emailInstitucional,
                                    );
                                }
                            }
                            return;
                        },
                    );
                },
            );

            //Aviso email para usuarios de que tienen una clase nueva
            infoCompletaClase.asignatura.ficha.usuarios.map(async (usuario) => {
                if (usuario.id_tipo_rol === 3) {
                    await Helpers.enviarCorreo(
                        `Tienes una nueva clase en la asignatura "${
                            infoCompletaClase.asignatura.asignatura
                                .nombre_asignatura
                        }."
                            <br>
                        Dia: ${moment(infoCompletaClase.dia)
                            .locale('es')
                            .format('MMMM, dddd [de] YYYY, h:mm:ss a')
                            .split(' ')
                            .map(
                                (valor) =>
                                    valor.charAt(0).toUpperCase() +
                                    valor.slice(1),
                            )
                            .join(' ')}
                            <br>
                        Hora de inicio: ${diaCompletoClaseInicio.format(
                            'hh:mm:ss A',
                        )}
                            <br>
                        Hora de finalización: ${diaCompletoClaseFin.format(
                            'hh:mm:ss A',
                        )}
                            <br>
                        Aproximadamente ${diaCompletoClaseInicio
                            .locale('es')
                            .fromNow()}
                        `,
                        'Nueva clase registrada en Qrlean.',
                        'Nueva clase registrada.',
                        usuario.emailInstitucional,
                    );
                }
            });
            console.log(scheduler.scheduledJobs);
            return claseNueva;
        } catch (e) {
            console.log(e);
            throw new Error('Error al intentar crear la clase.');
        }
    }
    static async eliminarClase(id: number): Promise<Boolean> {
        try {
            let clase = await ClasesService.ObtenerClase({ id_clase: id });
            await clase.destroy();
            let jobAviso = scheduler.scheduledJobs[`${id}-sysAviso`];
            let jobInasistencia =
                scheduler.scheduledJobs[`${id}-sysInasistencia`];
            if (jobAviso || jobInasistencia) {
                jobAviso.cancel();
                jobInasistencia.cancel();
            }
            return true;
        } catch (e) {
            console.log(e);
            throw new Error('Error al intentar eliminar la clase.');
        }
    }
}

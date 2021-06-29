import { Asistencias } from '../models/asistencias.model';
import { Tipo_asistencias } from '../models/tipo_asistencias.model';
import { Asociacion_usuarios_fichas } from '../models/asociacion_usuarios_fichas.model';
import { Usuario } from '../models/usuarios.model';
import { Tipo_roles } from '../models/tipo_roles.models';
import { Tipo_documento } from '../models/tipo_documento.model';
import { Ciudades } from '../models/cuidades.model';
import { Departamento } from '../models/departamentos.models';
import { Ficha } from '../models/ficha.model';
import { Clases } from '../models/clases.model';
import { Asociacion_asignaturas_fichas } from '../models/asociacion_asignaturas_fichas.model';
import moment from 'moment';
export class AsistenciasService {
    public readonly id_clase: number;
    public readonly id_tipo_asistencia: number;
    public readonly id_aprendiz: number;
    public readonly id_solicitud_cambio_asistencia: number | undefined;
    constructor(
        id_clase: number,
        id_tipo_asistencia: number,
        id_aprendiz: number,
        id_solicitud_cambio_asistencia: number | undefined,
    ) {
        this.id_clase = id_clase;
        this.id_tipo_asistencia = id_tipo_asistencia;
        this.id_aprendiz = id_aprendiz;
        this.id_solicitud_cambio_asistencia = id_solicitud_cambio_asistencia;
    }
    static async obtenerAsistencia(where: {}): Promise<Asistencias> {
        try {
            let asistencia = await Asistencias.findOne({
                where,
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
            });
            if (!asistencia) {
                throw new Error('La asistencia que busca no existe.');
            }
            return asistencia;
        } catch (e) {
            throw new Error('Error al intentar obtener asistencia.');
        }
    }

    public async registrarAsistenciaInstructor(): Promise<
        Asistencias | boolean
    > {
        try {
            let clase = await Clases.findByPk(this.id_clase, {
                include: [
                    {
                        model: Asociacion_asignaturas_fichas,
                        include: [
                            {
                                model: Ficha,
                            },
                        ],
                    },
                ],
            });
            if (!clase) {
                throw new Error('Error , la clase no existe.');
            }
            let ficha = await Ficha.findByPk(clase.asignatura.ficha.id_ficha);
            let asociacionUsuarioFicha = await Asociacion_usuarios_fichas.findByPk(
                this.id_aprendiz,
            );

            let usuario = await Usuario.findByPk(
                asociacionUsuarioFicha?.id_usuario,
            );
            if (!usuario) {
                return false;
            }
            if (usuario.id_tipo_rol === 2) {
                return false;
            }
            let usuarioPerteneceFicha = await ficha?.$has('usuarios', usuario);
            if (!usuarioPerteneceFicha) {
                return false;
            }
            // console.log(
            //     clase.toJSON(),
            //     ficha?.toJSON(),
            //     usuario?.toJSON(),
            //     usuarioPerteneceFicha,
            // );
            let asistenciaUsuario = await Asistencias.findOne({
                where: {
                    id_clase: this.id_clase,
                    id_tipo_asistencia: this.id_tipo_asistencia,
                    id_aprendiz: this.id_aprendiz,
                },
            });
            if (!asistenciaUsuario) {
                let asistenciaCreada = await Asistencias.create({
                    id_aprendiz: this.id_aprendiz,
                    id_clase: this.id_clase,
                    id_tipo_asistencia: this.id_tipo_asistencia,
                    id_solicitud_cambio_asistencia: this
                        .id_solicitud_cambio_asistencia,
                });
                return AsistenciasService.obtenerAsistencia({
                    id_asistencia: asistenciaCreada.id_asistencia,
                });
            } else {
                asistenciaUsuario.hora_firmada = (Date.now() as unknown) as Date;
                asistenciaUsuario.id_tipo_asistencia = this.id_tipo_asistencia;
                asistenciaUsuario.id_solicitud_cambio_asistencia = this.id_solicitud_cambio_asistencia;
                let asistenciaCreada = await asistenciaUsuario.save();
                return AsistenciasService.obtenerAsistencia({
                    id_asistencia: asistenciaCreada.id_asistencia,
                });
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    public async registrarAsistenciaAprendiz(): Promise<Asistencias> {
        try {
            let clase = await Clases.findByPk(this.id_clase, {
                include: [
                    {
                        model: Asociacion_asignaturas_fichas,
                        include: [
                            {
                                model: Ficha,
                            },
                        ],
                    },
                ],
            });
            if (!clase) {
                throw new Error('Error , la clase no existe.');
            }
            let diaHoraInicioClase = moment(
                `${clase.dia} ${clase.hora_inicio}`,
            );
            let diaHoraFinalClase = moment(`${clase.dia} ${clase.hora_final}`);

            let diaActual = moment(Date.now());

            if (
                diaActual.isBetween(diaHoraInicioClase, diaHoraFinalClase) ===
                false
            ) {
                throw new Error(
                    'Error, no esta permito firmar asistencia fuera del tiempo establecido por la clase.',
                );
            }

            let ficha = await Ficha.findByPk(clase.asignatura.ficha.id_ficha);
            let asociacionUsuarioFicha = await Asociacion_usuarios_fichas.findByPk(
                this.id_aprendiz,
            );

            let usuario = await Usuario.findByPk(
                asociacionUsuarioFicha?.id_usuario,
            );
            if (!usuario) {
                throw new Error('Error, el usuario no existe');
            }
            if (usuario.id_tipo_rol === 2) {
                throw new Error(
                    'Error, el usuario no puede ser instructor de la ficha',
                );
            }
            let usuarioPerteneceFicha = await ficha?.$has('usuarios', usuario);
            if (!usuarioPerteneceFicha) {
                throw new Error('Error, el usuario no pertenece a la ficha.');
            }
            let existeAsistenciaDelUsuario = await Asistencias.findOne({
                where: {
                    id_clase: this.id_clase,
                    id_tipo_asistencia: this.id_tipo_asistencia,
                    id_aprendiz: this.id_aprendiz,
                },
            });
            if (existeAsistenciaDelUsuario) {
                throw new Error(
                    'El aprendiz ya tiene una asistencia registrada , si desea cambiarla contacte al instructor de la clase',
                );
            }
            let asistenciaCreada = await Asistencias.create({
                id_aprendiz: this.id_aprendiz,
                id_clase: this.id_clase,
                id_tipo_asistencia: 1,
                id_solicitud_cambio_asistencia: null,
            });
            return AsistenciasService.obtenerAsistencia({
                id_asistencia: asistenciaCreada.id_asistencia,
            });
        } catch (e) {
            console.log(e);
            throw new Error((e as Error).message);
        }
    }
}

import { Ficha } from '../models/ficha.model';
import { Programa } from '../models/programa.model';
import { Solicitudes_cambio_asistencia } from '../models/solicitudes_cambio_asistencia.model';
import { Usuario } from '../models/usuarios.model';
import { Asociacion_asignaturas_fichas } from '../models/asociacion_asignaturas_fichas.model';
import { Clases } from '../models/clases.model';
import { Asistencias } from '../models/asistencias.model';
import { Tipo_roles } from '../models/tipo_roles.models';
import { Tipo_documento } from '../models/tipo_documento.model';
import { Ciudades } from '../models/cuidades.model';
import { Departamento } from '../models/departamentos.models';
import { UsuarioService } from './UsuarioService';
import { Asignatura } from '../models/asignaturas.model';
import { Asociacion_usuarios_fichas } from '../models/asociacion_usuarios_fichas.model';
import { Tipo_asistencias } from '../models/tipo_asistencias.model';
// const FichaInstance = new Ficha();
interface FichaEdit {
    id_ficha: number;
    id_programa: number;
}
export class FichaService {
    public readonly id_ficha?: number;
    public readonly id_programa: number;

    constructor(id_programa: number, id_ficha?: number) {
        if (id_ficha) {
            this.id_ficha = id_ficha;
        }
        this.id_programa = id_programa;
    }
    static async buscarFicha(where: {}): Promise<Ficha> {
        try {
            let ficha = await Ficha.findOne({
                attributes: ['id_ficha'],
                where,
                include: [
                    { model: Programa },
                    { model: Solicitudes_cambio_asistencia },
                    {
                        model: Asociacion_asignaturas_fichas,
                        attributes: ['id_asociacion_asignatura_ficha'],
                        include: [
                            {
                                model: Asignatura,
                            },
                            {
                                model: Asociacion_usuarios_fichas,
                                attributes: ['id_asociacion_usuario_ficha'],
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
                                            { model: Tipo_roles },
                                            { model: Tipo_documento },
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
                            {
                                model: Clases,
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
                                                                include: [
                                                                    Departamento,
                                                                ],
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
                    },
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
                            { model: Tipo_roles },
                            { model: Tipo_documento },
                            {
                                model: Ciudades,
                                attributes: ['id_ciudad', 'nombre_ciudad'],
                                include: [Departamento],
                            },
                        ],
                    },
                ],
            });
            if (!ficha) {
                throw new Error('Ficha no encontrada.');
            }
            return ficha;
        } catch (e) {
            console.log(e);
            throw new Error(
                'Error al intentar buscar la ficha,asegúrese que la ficha que esta requiriendo exista.',
            );
        }
    }
    static async buscarFichas(
        where: {},
        offset: number = 0,
        orderBy: String = 'id_ficha',
        limit: number = 20,
    ): Promise<{
        count: number;
        rows: Ficha[];
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
            let ficha = await Ficha.findAndCountAll({
                attributes: ['id_ficha'],
                where,
                offset,
                order: [[`${orderBy}`, 'DESC']],
                limit,
                include: [
                    { model: Programa },
                    // { model: Solicitudes_cambio_asistencia },
                    // {
                    //     model: Asociacion_asignaturas_fichas,
                    //     include: [
                    //         {
                    //             model: Clases,
                    //             include: [
                    //                 {
                    //                     model: Asistencias,
                    //                 },
                    //             ],
                    //         },
                    //     ],
                    // },
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
                            { model: Tipo_roles },
                            { model: Tipo_documento },
                            {
                                model: Ciudades,
                                attributes: ['id_ciudad', 'nombre_ciudad'],
                                include: [Departamento],
                            },
                        ],
                    },
                ],
            });
            return { ...ficha, limit, offset, orderBy };
        } catch (e) {
            console.log(e);
            throw new Error(
                'Error al intentar buscar la ficha, intente de nuevo más tarde.',
            );
        }
    }
    public async crearFicha(): Promise<Ficha> {
        try {
            let newFicha = new Ficha({
                id_programa: this.id_programa,
            });
            newFicha = await newFicha.save();
            newFicha = await FichaService.buscarFicha({
                id_ficha: newFicha.id_ficha,
            });
            return newFicha;
        } catch (e) {
            console.log(e);
            throw new Error('Error al intentar crear la ficha.');
        }
    }

    static async editarFicha(id: number, ficha: FichaEdit): Promise<Ficha> {
        try {
            let fichaEdit = await Ficha.findOne({ where: { id_ficha: id } });
            if (!fichaEdit) {
                throw new Error('Ficha no encontrada');
            }
            let fichaEditCont: boolean = false;
            Object.keys({
                id_programa: '',
            }).map((value) => {
                if (
                    !isNaN(<any>ficha[value as keyof FichaEdit]) &&
                    fichaEdit![value as keyof FichaEdit] !== null
                ) {
                    (<any>ficha[value as keyof FichaEdit]) = parseInt(
                        <string>(<any>ficha[value as keyof FichaEdit]),
                    );
                }
                if (
                    <any>fichaEdit![value as keyof FichaEdit] !==
                    <any>ficha[value as keyof FichaEdit]
                ) {
                    fichaEdit![value as keyof FichaEdit] = <any>(
                        ficha[value as keyof FichaEdit]
                    );
                    console.log('true');
                    fichaEditCont = true;
                } else {
                    return;
                }
            });
            if (fichaEditCont) {
                fichaEdit = await fichaEdit.save();
                return await FichaService.buscarFicha({
                    id_ficha: fichaEdit.id_ficha,
                });
            } else {
                throw new Error(
                    'Error, los datos enviados son exactamente los que ya posee la ficha.',
                );
            }
        } catch (e) {
            console.log(e);
            throw new Error((e as Error).message);
        }
    }
    static async eliminarFicha(id: number): Promise<boolean> {
        try {
            let ficha = await FichaService.buscarFicha({ id_ficha: id });
            await ficha.destroy();
            return true;
        } catch (e) {
            throw new Error('Error al intentar eliminar la ficha.');
        }
    }

    static async asociarAprendiz(
        id_aprendiz: number,
        id_ficha: number,
    ): Promise<Ficha> {
        try {
            const usuario = await UsuarioService.buscarUsuario({
                id_usuario: id_aprendiz,
            });
            const ficha = await FichaService.buscarFicha({
                id_ficha,
            });
            if (usuario.rol.id_tipo_rol !== 3) {
                throw new Error(
                    'Error al intentar asociar aprendiz a la ficha , el usuario debería ser un aprendiz.',
                );
            }
            if (await ficha.$has('usuarios', usuario)) {
                throw new Error(
                    'Error al intentar asociar aprendiz a la ficha , el usuario ya se encuentra asociado a esta ficha.',
                );
            }
            await ficha.$add('usuario', usuario);
            return await FichaService.buscarFicha({ id_ficha });
        } catch (e) {
            console.log(e);

            throw new Error((e as Error).message);
        }
    }
    static async asociarInstructor(
        id_instructor: number,
        id_ficha: number,
        id_asignatura: number,
    ): Promise<Ficha> {
        try {
            const usuario = await UsuarioService.buscarUsuario({
                id_usuario: id_instructor,
            });
            const ficha = await FichaService.buscarFicha({
                id_ficha,
            });
            const asignatura = await Asignatura.findOne({
                where: { id_asignatura },
            });
            if (!asignatura) {
                throw new Error(
                    'Error al intentar asociar instructor a la ficha , La asignatura no existe.',
                );
            }
            if (usuario.rol.id_tipo_rol !== 2) {
                throw new Error(
                    'Error al intentar asociar instructor a la ficha , el instructor debería ser un instructor.',
                );
            }
            if (await ficha.$has('usuarios', usuario)) {
                throw new Error(
                    'Error al intentar asociar instructor a la ficha ,el instructor ya se encuentra asociado a esta ficha.',
                );
            }
            const asociacion: any = await ficha.$add('usuario', usuario);

            await Asociacion_asignaturas_fichas.create({
                id_ficha: ficha.id_ficha,
                id_instructor:
                    asociacion[0].dataValues.id_asociacion_usuario_ficha,
                id_asignatura: asignatura.id_asignatura,
            });
            return await FichaService.buscarFicha({ id_ficha });
        } catch (e) {
            console.log(e);

            throw new Error((e as Error).message);
        }
    }
    static async desAsociarUsuario(
        id_usuario: number,
        id_ficha: number,
    ): Promise<Ficha> {
        try {
            const usuario = await UsuarioService.buscarUsuario({ id_usuario });
            const ficha = await FichaService.buscarFicha({ id_ficha });
            if (!(await ficha.$has('usuarios', usuario))) {
                throw new Error(
                    'Error al desasociar usuario de la ficha ,el usuario no se encuentra asociado a la ficha enviada.',
                );
            }
            await ficha.$remove('usuarios', usuario);
            return await FichaService.buscarFicha({ id_ficha });
        } catch (e) {
            console.log(e);
            throw new Error((e as Error).message);
        }
    }
    //obtener ficha de usuario

    //obtener ficha de instructor
}

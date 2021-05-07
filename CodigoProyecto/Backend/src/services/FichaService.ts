import { Ficha } from '../models/ficha.model';
import { Programa } from '../models/programa.model';
import { Solicitudes_cambio_asistencia } from '../models/solicitudes_cambio_asistencia.model';
import { Asignatura } from '../models/asignaturas.model';
import { Usuario } from '../models/usuarios.model';
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
                    { model: Asignatura },
                    { model: Usuario },
                ],
            });
            if (!ficha) {
                throw new Error('Ficha no encontrada.');
            }
            return ficha;
        } catch (e) {
            throw new Error('Error al intentar buscar la ficha.');
        }
    }
    static async buscarFichas(where: {}): Promise<Ficha[]> {
        try {
            let ficha = await Ficha.findAll({
                attributes: ['id_ficha'],
                where,
                include: [
                    { model: Programa },
                    { model: Solicitudes_cambio_asistencia },
                    { model: Asignatura },
                    { model: Usuario },
                ],
            });
            if (!ficha) {
                throw new Error('Ficha no encontrada.');
            }
            return ficha;
        } catch (e) {
            throw new Error('Error al intentar buscar la ficha.');
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
            throw new Error('Error al intentar editar la ficha.');
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
}

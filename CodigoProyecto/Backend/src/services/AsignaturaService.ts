import { Asignatura } from '../models/asignaturas.model';
export class AsignaturaService {
    static async obtenerAsignaturas(where: {}): Promise<any> {
        try {
            let asignaturas = await Asignatura.findAndCountAll({ where });
            return asignaturas;
        } catch (e) {
            console.log(e);
            throw new Error('Error al intentar obtener las asignaturas.');
        }
    }
}

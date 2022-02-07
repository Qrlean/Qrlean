import { AsignaturaFicha } from '../../entities/asignaturaFichas.entity';
import { plainToClass } from 'class-transformer';
export const asignaturaFichaStub: AsignaturaFicha = plainToClass(
    AsignaturaFicha,
    {
        id_asociacion_asignatura_ficha: 1,
        id_ficha: 1,
        id_instructor: 1,
        id_asignatura: 1,
    },
);

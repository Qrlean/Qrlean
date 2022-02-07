import { plainToClass } from 'class-transformer';
import { Programa } from '../../entities/programas.entity';

export const programaStub = plainToClass(Programa, {
    id_programa: 1,
    nombre_programa: '13123',
});

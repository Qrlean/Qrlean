import { plainToClass } from 'class-transformer';
import { Ficha } from '../../entities/ficha.entity';
export const fichaStub: Ficha = plainToClass(Ficha, {
    id_ficha: Date.now(),
    id_programa: 1,
});

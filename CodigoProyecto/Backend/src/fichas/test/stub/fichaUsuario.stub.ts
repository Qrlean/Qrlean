import { plainToClass } from 'class-transformer';
import { FichaUsuario } from '../../entities/fichaUsuario.entity';
export const fichaUsuarioStub: FichaUsuario = plainToClass(FichaUsuario, {
    id_asociacion_usuario_ficha: 1,
    id_ficha: 1,
    id_usuario: 1,
});

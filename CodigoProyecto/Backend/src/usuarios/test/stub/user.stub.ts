import { plainToClass } from 'class-transformer';
import { Usuario } from '../../entities/usuario.entity';
import { uuid } from 'uuidv4';
export const userStub: Usuario = plainToClass(Usuario, {
    id_usuario: Date.now(),
    nombres_usuario: 'Brayan',
    apellidos_usuario: 'Alto',
    numero_documento: 5555555,
    emailInstitucional: '1234123@gmail.com',
    direccion_residencial: '1234',
    telefono_movil: 23242,
    password: uuid(),
    id_tipo_documento: 2,
    id_tipo_rol: 2,
    id_ciudad: 2,
});

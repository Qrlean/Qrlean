import { Usuario } from '../models/usuarios.model';
import { UsuarioService } from './UsuarioService';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Helpers } from '../class/Helpers';
interface UsuarioEdit {
    nombres_usuario: string;
    apellidos_usuario: string;
    numero_documento: number;
    emailInstitucional: string;
    direccion_residencial: string;
    telefono_movil: number;
    id_ciudad: number;
    id_tipo_rol: number;
    id_tipo_documento: number;
}
export class AdministradorService extends UsuarioService {
    //v4 password -
    //hash password
    //create user
    //send email
    static async registrarUsuario(usuario: UsuarioService): Promise<any> {
        try {
            console.log(usuario);
            if (
                !usuario.nombres_usuario ||
                !usuario.apellidos_usuario ||
                !usuario.numero_documento ||
                !usuario.emailInstitucional ||
                !usuario.direccion_residencial ||
                !usuario.telefono_movil ||
                !usuario.id_ciudad ||
                !usuario.id_tipo_rol ||
                !usuario.id_tipo_documento
            ) {
                throw new Error(
                    'Error, debería enviar todos los parámetros para registrar un usuario.',
                );
            }
            let password = uuidv4();
            console.log(password);
            let passwordHash = await bcrypt.hash(password, 10);
            let newUsuario = new Usuario({
                nombres_usuario: usuario.nombres_usuario,
                apellidos_usuario: usuario.apellidos_usuario,
                numero_documento: usuario.numero_documento,
                emailInstitucional: usuario.emailInstitucional,
                password: passwordHash,
                direccion_residencial: usuario.direccion_residencial,
                telefono_movil: usuario.telefono_movil,
                id_ciudad: usuario.id_ciudad,
                id_tipo_rol: usuario.id_tipo_rol,
                id_tipo_documento: usuario.id_tipo_documento,
            });
            await newUsuario.save();
            if (!newUsuario) {
                throw new Error('Fallo al intentar crear usuario.');
            }
            console.log(newUsuario.toJSON());
            newUsuario = await UsuarioService.buscarUsuario({
                id_usuario: newUsuario.id_usuario,
            });
            await Helpers.enviarCorreo(
                `Este correo es para avisarte que te han registrado en el sistema de gestión de asistencias QrLean, podrás entrar a tu cuenta con los siguientes datos:
                <br>
                Documento de identidad:${newUsuario.numero_documento}
                <br>
                Tipo de documento de identidad:${newUsuario.documento.nombre_documento}
                <br>
                Contraseña:${password}`,
                '¡Bienvenido a Qrlean!',
                'Creación de cuenta en Qrlean',
                newUsuario.emailInstitucional,
            );
            return newUsuario;
        } catch (e) {
            console.log(e);
            throw new Error('Error al crear el usuario.');
        }
    }
    static async eliminarUsuario(id: number): Promise<boolean> {
        try {
            let usuario: Usuario = await UsuarioService.buscarUsuario({
                id_usuario: id,
            });
            await usuario.destroy();
            return true;
        } catch (e) {
            throw new Error('Error al intentar eliminar el usuario');
        }
    }
    static async editarUsuario(id: number, usuario: UsuarioEdit): Promise<any> {
        try {
            let usuarioEdit = await Usuario.findOne({
                attributes: [
                    'id_usuario',
                    'nombres_usuario',
                    'apellidos_usuario',
                    'numero_documento',
                    'emailInstitucional',
                    'direccion_residencial',
                    'telefono_movil',
                    'id_ciudad',
                    'id_tipo_rol',
                    'id_tipo_documento',
                ],
                where: {
                    id_usuario: id,
                },
            });
            if (!usuarioEdit) {
                throw new Error('Error , usuario no encontrado.');
            }
            let usuarioEditCont: boolean = false;
            Object.keys({
                nombres_usuario: '',
                apellidos_usuario: '',
                numero_documento: 1,
                emailInstitucional: '',
                direccion_residencial: '',
                telefono_movil: 1,
                id_ciudad: 1,
                id_tipo_rol: 1,
                id_tipo_documento: 1,
            }).map((value) => {
                if (!isNaN(<any>usuario[value as keyof UsuarioEdit])) {
                    (<any>usuario[value as keyof UsuarioEdit]) = parseInt(
                        <string>(<any>usuario[value as keyof UsuarioEdit]),
                    );
                }
                if (
                    <string>(<any>usuarioEdit![value as keyof UsuarioEdit]) ===
                        <any>usuario[value as keyof UsuarioEdit] &&
                    <any>usuario[value as keyof UsuarioEdit]
                ) {
                    return;
                } else {
                    (<any>usuarioEdit![value as keyof UsuarioEdit]) = <any>(
                        usuario[value as keyof UsuarioEdit]
                    );
                    usuarioEditCont = true;
                }
            });
            if (usuarioEditCont) {
                let password = uuidv4();
                let passwordHash = await bcrypt.hash(password, 10);
                usuarioEdit.password = passwordHash;
                let usuarioEditado = await usuarioEdit.save();

                usuarioEditado = await UsuarioService.buscarUsuario({
                    id_usuario: usuarioEditado.id_usuario,
                });
                // console.log(usuarioEdit.toJSON());
                // console.log(usuarioEditado.toJSON());
                await Helpers.enviarCorreo(
                    `Este correo es para avisarte que han editado tus datos en el sistema de gestión de asistencias QrLean, podrás entrar a tu cuenta con los siguientes datos:
                    <br>
                    Documento de identidad:${usuarioEditado.numero_documento}
                    <br>
                    Tipo de documento de identidad:${usuarioEditado.documento.nombre_documento}
                    <br>
                    Contraseña:${password}`,
                    '¡Bienvenido a Qrlean!',
                    'Creación de cuenta en Qrlean',
                    usuarioEditado.emailInstitucional,
                );
                return usuarioEditado;
            } else {
                throw new Error(
                    'Error, los datos enviados son exactamente los que ya posee el usuario.',
                );
            }
        } catch (e) {
            console.log(e);
            throw new Error(
                'Error al intentar editar el usuario , intente de nuevo más tarde.',
            );
        }
    }
}

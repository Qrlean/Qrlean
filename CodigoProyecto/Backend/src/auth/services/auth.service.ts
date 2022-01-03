import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { BcryptService } from './bcrypt.service';
import { CorreoService } from '../../correo/services/correo.service';
import { Templates } from '../../correo/enum/templates.enum';
import { BlackListService } from './blacklist.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        private readonly correoService: CorreoService,
        private readonly blackListService: BlackListService,
    ) {}

    async validateUser(
        numero_documento: number,
        id_tipo_documento: number,
        passwordP: string,
    ): Promise<any | boolean> {
        const user = await this.usuariosService.findOneByProperty({
            numero_documento,
            id_tipo_documento,
        });
        if (
            user &&
            (await this.bcryptService.compare(passwordP, user.password))
        ) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async changePasswordRequest(
        idTipoDocumento: number,
        documento: number,
    ): Promise<void> {
        const user = await this.usuariosService.findOneByProperty({
            id_tipo_documento: idTipoDocumento,
            numero_documento: documento,
        });
        if (user) {
            const token = await this.jwtService.signAsync({
                id_usuario: user.id_usuario,
                id_tipo_documento: user.id_tipo_documento,
                numero_documento: user.numero_documento,
                type: 'passwordRecovery',
            });
            this.correoService.sendEmail(
                user.emailInstitucional,
                {
                    link: `https://${process.env.FRONT_END_URL}/passwordChange?token=${token}`,
                },
                'Cambio de contraseña',
                Templates.newPassword,
            );
        }
    }
    async changePassword(token: string, newPassword: string): Promise<void> {
        let decoded: {
            id_usuario: number;
            id_tipo_documento: number;
            numero_documento: number;
            type: string;
        };
        const tokenIsBlackListed =
            await this.blackListService.tokenIsBlacklisted(token);
        if (tokenIsBlackListed) {
            throw new BadRequestException(
                'El token proporcionado no es valido ,ya expiro o fue utilizado anteriormente',
            );
        }
        try {
            decoded = await this.jwtService.verifyAsync(token);
        } catch (e) {
            throw new BadRequestException(
                'El token proporcionado no es valido ,ya expiro o fue utilizado anteriormente',
            );
        }
        const password = await this.bcryptService.hash(newPassword);
        await this.usuariosService.userPasswordUpdate(
            decoded.id_usuario,
            password,
        );
        this.blackListService.tokenSetBlackList(token);
    }

    login(user: Usuario) {
        return {
            user,
            token: this.jwtService.sign(user),
        };
    }
}

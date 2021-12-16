import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { BcryptService } from './bcrypt.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(
        numero_documento: number,
        id_tipo_documento: number,
        passwordP: string,
    ): Promise<any> {
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
    login(user: Usuario) {
        return {
            user,
            token: this.jwtService.sign(user),
        };
    }
}

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
        emailInstitucional: string,
        password: string,
    ): Promise<any> {
        const user = await this.usuariosService.findOneByProperty({
            emailInstitucional,
        });
        if (
            user &&
            (await this.bcryptService.compare(password, user.password))
        ) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    login(user: Usuario) {
        return {
            token: this.jwtService.sign(user),
        };
    }
}

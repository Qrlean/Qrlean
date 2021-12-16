import * as dotenv from 'dotenv';
dotenv.config();
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../../usuarios/services/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usuarioService: UsuariosService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.usuarioService.findOneByProperty({
            id_usuario: payload.id_usuario,
        });
        if (!user) {
            throw new UnauthorizedException(
                'El usuario asociado al token no existe.',
            );
        }
        return user;
    }
}

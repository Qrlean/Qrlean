import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'numero_documento', passReqToCallback: true });
    }

    async validate(req: any, username: string, password: string): Promise<any> {
        console.log(req.body);
        const user = await this.authService.validateUser(
            req.body.numero_documento,
            req.body.id_tipo_documento,
            password,
        );
        if (!user) {
            throw new UnauthorizedException(
                'El numero de documento , tipo de documento o contraseña no son correctos.',
            );
        }
        return user;
    }
}

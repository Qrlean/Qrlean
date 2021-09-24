import * as dotenv from 'dotenv';
dotenv.config();
import { Module, forwardRef } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthService } from './services/auth.service';
import { BcryptService } from './services/bcrypt.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './services/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt.strategy';
@Module({
    imports: [
        forwardRef(() => UsuariosModule),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '10h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy],
    exports: [BcryptService],
})
export class AuthModule {}

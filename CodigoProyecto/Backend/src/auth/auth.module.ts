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
import { CorreoService } from '../correo/services/correo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtBlackList } from './entities/jwtBlackList.entity';
import { BlackListService } from './services/blacklist.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([JwtBlackList]),
        forwardRef(() => UsuariosModule),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '10h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        BcryptService,
        LocalStrategy,
        JwtStrategy,
        CorreoService,
        BlackListService,
    ],
    exports: [BcryptService, TypeOrmModule],
})
export class AuthModule {}

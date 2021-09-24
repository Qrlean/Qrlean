import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controller/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Departamentos } from './entities/departamentos.entity';
import { Ciudades } from './entities/ciudades.entity';
import { Tipo_roles } from './entities/tipo-roles.entity';
import { Tipo_documento } from './entities/tipo-documento.entity';
import { IsUserAlreadyExistConstraint } from '../decorators/UserExists';
import { AuthModule } from '../auth/auth.module';
import { CorreoModule } from '../correo/correo.module';
import { fichaUsuario } from '../fichas/entities/fichaUsuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Usuario,
            Departamentos,
            Ciudades,
            Tipo_roles,
            Tipo_documento,
            fichaUsuario,
        ]),
        forwardRef(() => AuthModule),
        CorreoModule,
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService, IsUserAlreadyExistConstraint],
    exports: [TypeOrmModule, UsuariosService],
})
export class UsuariosModule {}

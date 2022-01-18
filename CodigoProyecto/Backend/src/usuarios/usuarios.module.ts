import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controller/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Departamentos } from './entities/departamentos.entity';
import { Ciudades } from '../ciudades/entities/ciudades.entity';
import { TipoRoles } from './entities/tipo-roles.entity';
import { Tipo_documento } from './entities/tipo-documento.entity';
import { IsUserAlreadyExistConstraint } from '../decorators/UserExists';
import { AuthModule } from '../auth/auth.module';
import { CorreoModule } from '../correo/correo.module';
import { FichaUsuario } from '../fichas/entities/fichaUsuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Usuario,
            Departamentos,
            Ciudades,
            TipoRoles,
            Tipo_documento,
            FichaUsuario,
        ]),
        forwardRef(() => AuthModule),
        CorreoModule,
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService, IsUserAlreadyExistConstraint],
    exports: [TypeOrmModule, UsuariosService],
})
export class UsuariosModule {}

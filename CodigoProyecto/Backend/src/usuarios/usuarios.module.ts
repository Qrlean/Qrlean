import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controller/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Departamentos } from './entities/departamentos.entity';
import { Ciudades } from './entities/ciudades.entity';
import { Tipo_roles } from './entities/tipo-roles.entity';
import { Tipo_documento } from './entities/tipo-documento.entity';
import { IsUserAlreadyExistConstraint } from '../decorators/UserExists';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Usuario,
            Departamentos,
            Ciudades,
            Tipo_roles,
            Tipo_documento,
        ]),
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService, IsUserAlreadyExistConstraint],
    exports: [TypeOrmModule],
})
export class UsuariosModule {}

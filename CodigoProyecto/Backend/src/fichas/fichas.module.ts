import { Module } from '@nestjs/common';
import { FichasService } from './services/fichas.service';
import { FichasController } from './controller/fichas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity';
import { Programa } from './entities/programas.entity';
import { FichaUsuario } from './entities/fichaUsuario.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AsignaturasModule } from '../asignaturas/asignaturas.module';
import { AsignaturaFicha } from './entities/asignaturaFichas.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Ficha,
            Programa,
            FichaUsuario,
            Usuario,
            AsignaturaFicha,
        ]),
        UsuariosModule,
        AsignaturasModule,
    ],
    controllers: [FichasController],
    providers: [FichasService],
})
export class FichasModule {}

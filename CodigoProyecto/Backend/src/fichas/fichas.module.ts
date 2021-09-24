import { Module } from '@nestjs/common';
import { FichasService } from './services/fichas.service';
import { FichasController } from './controller/fichas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity';
import { Programa } from './entities/programas.entity';
import { fichaUsuario } from './entities/fichaUsuario.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ficha, Programa, fichaUsuario, Usuario]),
    ],
    controllers: [FichasController],
    providers: [FichasService],
})
export class FichasModule {}

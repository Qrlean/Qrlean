import { Module } from '@nestjs/common';
import { AsignaturasService } from './services/asignaturas.service';
import { AsignaturasController } from './controller/asignaturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { AsignaturaFicha } from '../fichas/entities/asignaturaFichas.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Asignatura, AsignaturaFicha])],
    controllers: [AsignaturasController],
    providers: [AsignaturasService],
    exports: [AsignaturasService],
})
export class AsignaturasModule {}

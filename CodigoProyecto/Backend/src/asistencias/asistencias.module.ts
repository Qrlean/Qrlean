import { Module } from '@nestjs/common';
import { AsistenciasService } from './services/asistencias.service';
import { AsistenciasController } from './controller/asistencias.controller';

@Module({
    controllers: [AsistenciasController],
    providers: [AsistenciasService],
})
export class AsistenciasModule {}

import { forwardRef, Module } from '@nestjs/common';
import { AsistenciasService } from './services/asistencias.service';
import { AsistenciasController } from './controller/asistencias.controller';
import { ClasesModule } from '../clases/clases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { TimeModule } from '../time/time.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Asistencia]),
        TimeModule,
        forwardRef(() => ClasesModule),
        // ClasesModule,
    ],
    controllers: [AsistenciasController],
    providers: [AsistenciasService],
    exports: [AsistenciasService, TypeOrmModule],
})
export class AsistenciasModule {}

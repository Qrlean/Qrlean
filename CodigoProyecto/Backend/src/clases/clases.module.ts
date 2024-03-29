import { forwardRef, Module } from '@nestjs/common';
import { ClasesService } from './services/clases.service';
import { ClasesController } from './controller/clases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { AsignaturaFicha } from '../fichas/entities/asignaturaFichas.entity';
import { TimeModule } from 'src/time/time.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CorreoModule } from 'src/correo/correo.module';
import { AsistenciasModule } from 'src/asistencias/asistencias.module';
import { QrModule } from '../qr/qr.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Clase, AsignaturaFicha]),
        TimeModule,
        ScheduleModule.forRoot(),
        CorreoModule,
        // AsistenciasModule,
        forwardRef(() => AsistenciasModule),
        QrModule,
    ],
    controllers: [ClasesController],
    providers: [ClasesService],
    exports: [ClasesService, TypeOrmModule],
})
export class ClasesModule {}

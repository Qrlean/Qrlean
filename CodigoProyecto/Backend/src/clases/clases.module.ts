import { Module } from '@nestjs/common';
import { ClasesService } from './services/clases.service';
import { ClasesController } from './controller/clases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { AsignaturaFicha } from '../fichas/entities/asignaturaFichas.entity';
import { TimeModule } from 'src/time/time.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CorreoModule } from 'src/correo/correo.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Clase, AsignaturaFicha]),
        TimeModule,
        ScheduleModule.forRoot(),
        CorreoModule,
    ],
    controllers: [ClasesController],
    providers: [ClasesService],
    exports: [ClasesService],
})
export class ClasesModule {}

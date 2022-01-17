import { Module } from '@nestjs/common';
import { ProgramasService } from './services/programas.service';
import { ProgramasController } from './controller/programas.controller';
import { Programa } from './entities/programas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Programa])],
    controllers: [ProgramasController],
    providers: [ProgramasService],
})
export class ProgramasModule {}

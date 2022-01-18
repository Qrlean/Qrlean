import { Module } from '@nestjs/common';
import { CiudadesService } from './services/ciudades.service';
import { CiudadesController } from './controller/ciudades.controller';
import { Ciudades } from './entities/ciudades.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Ciudades])],
    controllers: [CiudadesController],
    providers: [CiudadesService],
})
export class CiudadesModule {}

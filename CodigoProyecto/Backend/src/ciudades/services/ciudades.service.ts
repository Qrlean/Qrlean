import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudades } from '../entities/ciudades.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadesService {
    constructor(
        @InjectRepository(Ciudades)
        private ciudadesRepository: Repository<Ciudades>,
    ) {}
    findAll(): Promise<Ciudades[]> {
        return this.ciudadesRepository.find();
    }
}

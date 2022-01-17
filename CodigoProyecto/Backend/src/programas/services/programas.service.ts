import { Injectable } from '@nestjs/common';
import { Programa } from '../entities/programas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramasService {
    constructor(
        @InjectRepository(Programa)
        private programaRepository: Repository<Programa>,
    ) {}
    findAll(): Promise<Programa[]> {
        return this.programaRepository.find();
    }
}

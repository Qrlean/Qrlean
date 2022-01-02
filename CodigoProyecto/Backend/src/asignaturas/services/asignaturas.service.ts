import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from '../entities/asignatura.entity';

@Injectable()
export class AsignaturasService {
    constructor(
        @InjectRepository(Asignatura)
        private asignaturaRepository: Repository<Asignatura>,
    ) {}

    findAll(): Promise<Asignatura[]> {
        return this.asignaturaRepository.find();
    }

    async findOne(id: number): Promise<Asignatura> {
        const asignatura = await this.asignaturaRepository.findOne(id);
        if (!asignatura) {
            throw new NotFoundException(
                `La asignatura con el id ${id} no fue encontrada`,
            );
        }
        return asignatura;
    }
}

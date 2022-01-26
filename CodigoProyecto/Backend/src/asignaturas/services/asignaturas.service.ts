import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from '../entities/asignatura.entity';
import { AsignaturaFicha } from '../../fichas/entities/asignaturaFichas.entity';

@Injectable()
export class AsignaturasService {
    constructor(
        @InjectRepository(Asignatura)
        private asignaturaRepository: Repository<Asignatura>,

        @InjectRepository(AsignaturaFicha)
        private asignaturaFichaRepository: Repository<AsignaturaFicha>,
    ) {}

    findAll(): Promise<Asignatura[]> {
        return this.asignaturaRepository.find();
    }

    async findOneAsignaturaFicha(
        id: number,
        id_usuario: number,
    ): Promise<AsignaturaFicha> {
        const asignatura = await this.asignaturaFichaRepository.findOne(id, {
            relations: [
                'instructor',
                'asignatura',
                'clases',
                'clases.asistencias',
                'clases.asistencias.aprendiz',
                'clases.asistencias.aprendiz.usuario',
            ],
            where: (qb) => {
                qb.where(
                    '"AsignaturaFicha__instructor".id_usuario = :id_usuario',
                    { id_usuario },
                );
            },
        });
        if (!asignatura) {
            throw new NotFoundException(
                `La asignatura con el id ${id} no fue encontrada`,
            );
        }
        return asignatura;
    }
}

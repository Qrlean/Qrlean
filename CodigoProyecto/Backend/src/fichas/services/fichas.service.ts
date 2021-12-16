import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { UpdateFichaDto } from '../dto/update-ficha.dto';
import { Repository } from 'typeorm';
import { Ficha } from '../entities/ficha.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FichasService {
    constructor(
        @InjectRepository(Ficha)
        private fichasRepository: Repository<Ficha>,
    ) {}

    async create(createFichaDto: CreateFichaDto): Promise<Ficha> {
        let ficha = this.fichasRepository.create(createFichaDto);
        ficha = await this.fichasRepository.save(ficha);
        return this.fichasRepository.findOne(ficha.id_ficha, {
            relations: ['programa'],
        });
    }

    async findAll(): Promise<Ficha[]> {
        return this.fichasRepository.find({
            relations: ['programa'],
        });
    }

    async findOne(id: number) {
        const ficha = await this.fichasRepository.findOne(id, {
            relations: ['programa'],
        });
        if (!ficha) {
            throw new NotFoundException(`La ficha con id ${id} no existe.`);
        }
        return ficha;
    }

    async update(id: number, updateFichaDto: UpdateFichaDto) {
        const ficha = await this.fichasRepository.findOne(id);
        if (!ficha) {
            throw new NotFoundException(`La ficha con id ${id} no existe.`);
        }
        if (Object.keys(updateFichaDto).length === 0) {
            throw new BadRequestException(
                'Deberia enviar por lo menos un campo',
            );
        }
        await this.fichasRepository.update(id, updateFichaDto);
        return this.fichasRepository.findOne(id, {
            relations: ['programa'],
        });
    }

    async remove(id: number) {
        const ficha = await this.fichasRepository.findOne(id);
        if (!ficha) {
            throw new NotFoundException(`La ficha con id ${id} no existe.`);
        }
        return this.fichasRepository.remove(ficha);
    }
}

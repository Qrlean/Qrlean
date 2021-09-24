import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
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
        try {
            let ficha = this.fichasRepository.create(createFichaDto);
            ficha = await this.fichasRepository.save(ficha);
            return await this.fichasRepository.findOne(ficha.id_ficha, {
                relations: ['programa'],
            });
        } catch (e) {
            throw new InternalServerErrorException(
                'Error creando la ficha, intente de nuevo más tarde',
            );
        }
    }

    async findAll(): Promise<Ficha[]> {
        try {
            return await this.fichasRepository.find({
                relations: ['programa'],
            });
        } catch (e) {
            throw new InternalServerErrorException(
                'Error al intentar consultar la ficha , intente de nuevo más tarde.',
            );
        }
    }

    async findOne(id: number) {
        try {
            const ficha = await this.fichasRepository.findOne(id, {
                relations: ['programa'],
            });
            if (!ficha) {
                throw new NotFoundException(`La ficha con id ${id} no existe.`);
            }
            return ficha;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException(
                'Error al intentar consultar la ficha , intente de nuevo más tarde.',
            );
        }
    }

    async update(id: number, updateFichaDto: UpdateFichaDto) {
        try {
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
            return await this.fichasRepository.findOne(id, {
                relations: ['programa'],
            });
        } catch (e) {
            console.log(e);
            if (e instanceof NotFoundException) {
                throw e;
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException(
                'Error al intentar actualizar la ficha , intente de nuevo más tarde.',
            );
        }
    }

    async remove(id: number) {
        try {
            const ficha = await this.fichasRepository.findOne(id);
            if (!ficha) {
                throw new NotFoundException(`La ficha con id ${id} no existe.`);
            }
            return await this.fichasRepository.remove(ficha);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException(
                'Error al intentar eliminar la ficha, intente de nuevo más tarde.',
            );
        }
    }
}

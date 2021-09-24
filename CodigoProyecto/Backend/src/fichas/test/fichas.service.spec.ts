import { Test, TestingModule } from '@nestjs/testing';
import { FichasService } from '../services/fichas.service';
import { Ficha } from '../entities/ficha.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { fichasRepositoryMock } from '../__mocks__/fichas.repository';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { Repository } from 'typeorm';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UpdateFichaDto } from '../dto/update-ficha.dto';

describe('FichasService', () => {
    let service: FichasService;
    let spyServiceRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FichasService,
                {
                    provide: getRepositoryToken(Ficha),
                    useClass: fichasRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<FichasService>(FichasService);
        spyServiceRepository = module.get<Repository<Ficha>>(
            getRepositoryToken(Ficha),
        );
    });

    it('El Servicio "Fichas" es definido', () => {
        expect(service).toBeDefined();
    });
    describe('FichasService.create', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
            jest.spyOn(spyServiceRepository, 'create');
            jest.spyOn(spyServiceRepository, 'save');
        });
        it('Deberia retornar una ficha creada', async () => {
            let ficha: CreateFichaDto;
            const output = await service.create(ficha);
            expect(output).toBeInstanceOf(Ficha);
            expect(output).toEqual({
                id_ficha: expect.any(Number),
                id_programa: expect.any(Number),
            });
        });
        it('Deberia desencadenar Throw InternalServerErrorException si el repositorio falla guardando la ficha', async () => {
            let ficha: CreateFichaDto;
            spyServiceRepository.save.mockImplementationOnce(() => {
                throw new Error();
            });
            await expect(service.create(ficha)).rejects.toThrowError(
                InternalServerErrorException,
            );
        });
        it('Deberia desencadenar Throw InternalServerErrorException si el repositorio falla buscando la ficha', async () => {
            let ficha: CreateFichaDto;
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                throw new Error();
            });
            await expect(service.create(ficha)).rejects.toThrowError(
                InternalServerErrorException,
            );
        });
        it('Deberia llamar a los servicios Repository.create ,Repository.save y Repository.findOne', async () => {
            let ficha: CreateFichaDto;
            await service.create(ficha);
            expect(spyServiceRepository.create).toHaveBeenCalled();
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
            expect(spyServiceRepository.save).toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('FichasService.findAll', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'find');
        });
        it('Deberia retornar una lista de fichas', async () => {
            const output = await service.findAll();
            output.forEach((ficha) => {
                expect(ficha).toBeInstanceOf(Ficha);
                expect(ficha).toEqual({
                    id_ficha: expect.any(Number),
                    id_programa: expect.any(Number),
                });
            });
        });
        it('Deberia desencadenar Throw InternalServerErrorException si el repositorio falla buscando las fichas', async () => {
            spyServiceRepository.find.mockImplementationOnce(() => {
                throw new Error();
            });
            await expect(service.findAll()).rejects.toThrowError(
                InternalServerErrorException,
            );
        });

        it('Deberia llamar a los servicios Repository.find', async () => {
            await service.findAll();
            expect(spyServiceRepository.find).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('FichasService.findOne', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar una ficha', async () => {
            const output = await service.findOne(1);
            expect(output).toBeInstanceOf(Ficha);
            expect(output).toEqual({
                id_ficha: expect.any(Number),
                id_programa: expect.any(Number),
            });
        });
        it('Deberia desencadenar Throw NotFoundException si no hay una ficha con el id enviado', async () => {
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                return undefined;
            });
            await expect(service.findOne(1)).rejects.toThrowError(
                NotFoundException,
            );
        });
        it('Deberia desencadenar Throw InternalServerErrorException si el repositorio falla buscando la ficha', async () => {
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                throw new Error('');
            });
            await expect(service.findOne(1)).rejects.toThrowError(
                InternalServerErrorException,
            );
        });

        it('Deberia llamar a los servicios Repository.findOne', async () => {
            await service.findOne(1);
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('FichasService.update', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'update');
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar una ficha actualizada', async () => {
            const ficha: UpdateFichaDto = { id_programa: 1234 };
            const output = await service.update(1, ficha);
            expect(output).toBeInstanceOf(Ficha);
            expect(output).toEqual({
                id_ficha: expect.any(Number),
                id_programa: expect.any(Number),
            });
        });
        it('Deberia desencadenar Throw NotFoundException si la ficha no existe', async () => {
            const ficha: UpdateFichaDto = { id_programa: 1234 };
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                return undefined;
            });

            await expect(service.update(1, ficha)).rejects.toThrowError(
                NotFoundException,
            );
        });
        it('Deberia desencadenar Throw BadRequestException si no se envia por lo menos un dato a editar', async () => {
            const ficha: UpdateFichaDto = {};
            await expect(service.update(1, ficha)).rejects.toThrowError(
                BadRequestException,
            );
        });
        it('Deberia desencadenar Throw InternalServerErrorException si el repositorio falla buscando la ficha', async () => {
            const ficha: UpdateFichaDto = { id_programa: 1234 };
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                throw new Error('');
            });
            await expect(service.update(1, ficha)).rejects.toThrowError(
                InternalServerErrorException,
            );
        });
        it('Deberia desencadenar Throw InternalServerErrorException si el repositorio falla actualizando la ficha', async () => {
            const ficha: UpdateFichaDto = { id_programa: 1234 };
            spyServiceRepository.update.mockImplementationOnce(() => {
                throw new Error('');
            });

            await expect(service.update(1, ficha)).rejects.toThrowError(
                InternalServerErrorException,
            );
        });

        it('Deberia llamar a los servicios Repository.update y Repository.findOne', async () => {
            const ficha: UpdateFichaDto = { id_programa: 1234 };
            await service.update(1, ficha);
            expect(spyServiceRepository.update).toHaveBeenCalled();
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('FichasService.remove', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'remove');
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar una ficha', async () => {
            const output = await service.remove(1);
            expect(output).toBeInstanceOf(Ficha);
            expect(output).toEqual({
                id_ficha: expect.any(Number),
                id_programa: expect.any(Number),
            });
        });
        it('Deberia desencadenar Throw NotFoundException si la ficha no existe', async () => {
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                return undefined;
            });

            await expect(service.remove(1)).rejects.toThrowError(
                NotFoundException,
            );
        });
        it('Deberia desencadenar Throw InternalServerErrorException si el repositorio falla buscando la ficha', async () => {
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                throw new Error('');
            });
            await expect(service.remove(1)).rejects.toThrowError(
                InternalServerErrorException,
            );
        });
        it('Deberia desencadenar Throw InternalServerErrorException si el repositorio falla removiendo la ficha', async () => {
            spyServiceRepository.remove.mockImplementationOnce(() => {
                throw new Error('');
            });

            await expect(service.remove(1)).rejects.toThrowError(
                InternalServerErrorException,
            );
        });

        it('Deberia llamar a los servicios Repository.findOne y Repository.remove', async () => {
            await service.remove(1);
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
            expect(spyServiceRepository.remove).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProgramasService } from '../services/programas.service';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Programa } from '../entities/programas.entity';
import { ProgramasRepositoryMock } from '../__mocks__/programas.repository';
describe('ProgramasService', () => {
    let service: ProgramasService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProgramasService,
                {
                    provide: getRepositoryToken(Programa),
                    useClass: ProgramasRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<ProgramasService>(ProgramasService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('ProgramasService.findAll', () => {
        it('Deberia retornar un array de programas', async () => {
            const output = await service.findAll();
            output.forEach((x) => {
                expect(x).toMatchObject({
                    id_programa: expect.any(Number),
                    nombre_programa: expect.any(String),
                });
            });
        });
    });
});

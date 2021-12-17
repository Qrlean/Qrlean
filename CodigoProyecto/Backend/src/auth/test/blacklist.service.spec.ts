import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtBlackList } from '../entities/jwtBlackList.entity';
import { BlackListService } from '../services/blacklist.service';
import { JwtBlackListRepositoryMock } from '../__mocks__/jwtBlackList.repository';

describe('blackListService', () => {
    let service: BlackListService;
    let spyJwtBlackListRepository;
    let module: TestingModule;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                BlackListService,
                {
                    provide: getRepositoryToken(JwtBlackList),
                    useClass: JwtBlackListRepositoryMock,
                },
            ],
        }).compile();
        service = module.get<BlackListService>(BlackListService);
        spyJwtBlackListRepository = module.get<Repository<JwtBlackList>>(
            getRepositoryToken(JwtBlackList),
        );
    });
    afterEach(async () => {
        await module.close();
    });
    it('El Servicio "Blacklist" es definido', () => {
        expect(service).toBeDefined();
    });
    describe('blackListService.tokenIsBlacklisted', () => {
        beforeEach(() => {
            jest.spyOn(spyJwtBlackListRepository, 'findOne');
        });
        it('Deberia retornar false si el token no es encontrado en la base de datos', async () => {
            spyJwtBlackListRepository.findOne.mockReturnValueOnce(undefined);
            const res = await service.tokenIsBlacklisted('test');
            expect(res).toEqual(false);
        });
        it('Deberia retornar true si el token si es encontrado en la base de datos', async () => {
            spyJwtBlackListRepository.findOne.mockReturnValueOnce({});
            const res = await service.tokenIsBlacklisted('test');
            expect(res).toEqual(true);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('blackListService.tokenSetBlackList', () => {
        beforeEach(() => {
            jest.spyOn(spyJwtBlackListRepository, 'create');
            jest.spyOn(spyJwtBlackListRepository, 'save');
        });
        it('Deberia llamar a los servicios Repository.create y Repository.save', async () => {
            await service.tokenSetBlackList('test');
            expect(spyJwtBlackListRepository.create).toHaveBeenCalled();
            expect(spyJwtBlackListRepository.save).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../services/bcrypt.service';

describe('BcryptService', () => {
    let service: BcryptService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BcryptService],
        }).compile();

        service = module.get<BcryptService>(BcryptService);
    });

    it('El Servicio "Bcrypt" es definido', () => {
        expect(service).toBeDefined();
    });
    describe('BcryptService.hash', () => {
        it('Retorna un string', async () => {
            const output = await service.hash('');
            expect(output).toEqual(expect.any(String));
        });
    });
    describe('BcryptService.compare', () => {
        it('Retorna un true si las contraseñas corresponden', async () => {
            const output = await service.compare('', '');
            expect(output).toEqual(expect.any(Boolean));
        });
        it('Retorna un false si las contraseñas no corresponden', async () => {
            const output = await service.compare('', '');
            expect(output).toEqual(expect.any(Boolean));
        });
    });
});

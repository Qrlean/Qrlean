import { Test, TestingModule } from '@nestjs/testing';
import { AsignaturasService } from '../services/asignaturas.service';

describe('AsignaturasService', () => {
    let service: AsignaturasService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AsignaturasService],
        }).compile();

        service = module.get<AsignaturasService>(AsignaturasService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

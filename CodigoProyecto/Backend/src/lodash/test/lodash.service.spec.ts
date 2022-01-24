import { Test, TestingModule } from '@nestjs/testing';
import { LodashService } from '../services/lodash.service';

describe('LodashService', () => {
    let service: LodashService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LodashService],
        }).compile();

        service = module.get<LodashService>(LodashService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

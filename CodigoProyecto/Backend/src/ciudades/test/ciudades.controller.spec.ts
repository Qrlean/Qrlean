import { Test, TestingModule } from '@nestjs/testing';
import { CiudadesController } from '../controller/ciudades.controller';
import { CiudadesService } from '../services/ciudades.service';

describe('CiudadesController', () => {
    let controller: CiudadesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CiudadesController],
            providers: [CiudadesService],
        }).compile();

        controller = module.get<CiudadesController>(CiudadesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

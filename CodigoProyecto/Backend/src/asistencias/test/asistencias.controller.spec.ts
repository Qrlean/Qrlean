import { Test, TestingModule } from '@nestjs/testing';
import { AsistenciasController } from '../controller/asistencias.controller';
import { AsistenciasService } from '../services/asistencias.service';

describe('AsistenciasController', () => {
    let controller: AsistenciasController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AsistenciasController],
            providers: [AsistenciasService],
        }).compile();

        controller = module.get<AsistenciasController>(AsistenciasController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProgramasController } from '../controller/programas.controller';
import { ProgramasService } from '../services/programas.service';
import { programasServiceMock } from '../../__mocks__/programas.service';

describe('ProgramasController', () => {
    let controller: ProgramasController;
    let spyProgramasService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProgramasController],
            providers: [
                {
                    provide: ProgramasService,
                    useValue: programasServiceMock,
                },
            ],
        }).compile();
        spyProgramasService = module.get<ProgramasService>(ProgramasService);
        controller = module.get<ProgramasController>(ProgramasController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('ProgramasController.findAll', () => {
        it('Debe llamar al metodo "findAll" del servicio "UsuariosService"', async () => {
            await controller.findAll();
            expect(spyProgramasService.findAll).toBeCalled();
        });
    });
});

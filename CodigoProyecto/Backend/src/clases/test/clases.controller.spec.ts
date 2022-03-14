import { Test, TestingModule } from '@nestjs/testing';
import { ClasesService } from '../services/clases.service';
import { clasesServiceMock } from '../../__mocks__/clases.service';
import { ClasesController } from '../controller/clases.controller';

describe('ClasesController', () => {
    let controller: ClasesController;
    let spyClasesService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClasesController],
            providers: [
                {
                    provide: ClasesService,
                    useValue: clasesServiceMock,
                },
            ],
        }).compile();
        spyClasesService = module.get<ClasesService>(ClasesService);
        controller = module.get<ClasesController>(ClasesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('FichasController.create', () => {
        it('Debe llamar al metodo "create" del servicio "ClasesService"', async () => {
            await controller.create({ user: { id_usuario: 1 } }, 2, {
                nombre_clase: 'afdsf',
                dia: '',
                hora_inicio: '',
                hora_final: '',
                qr_available: true,
            });
            expect(spyClasesService.create).toHaveBeenCalled();
        });
    });
    describe('FichasController.findAll', () => {
        it('Debe llamar al metodo "findAll" del servicio "ClasesService"', async () => {
            await controller.findAll(1);
            expect(spyClasesService.findAllByAsignaturaId).toHaveBeenCalled();
        });
    });
    describe('FichasController.findOne', () => {
        it('Debe llamar al metodo "findOne" del servicio "ClasesService"', async () => {
            await controller.findOne(1);
            expect(spyClasesService.findOne).toHaveBeenCalled();
        });
    });
    describe('FichasController.remove', () => {
        it('Debe llamar al metodo "remove" del servicio "ClasesService"', async () => {
            await controller.remove(1);
            expect(spyClasesService.remove).toHaveBeenCalled();
        });
    });
});

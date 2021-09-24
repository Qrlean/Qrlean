import { Test, TestingModule } from '@nestjs/testing';
import { fichasServiceMock } from '../../__mocks__/fichas.service';
import { FichasController } from '../controller/fichas.controller';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { UpdateFichaDto } from '../dto/update-ficha.dto';
import { FichasService } from '../services/fichas.service';

describe('FichasController', () => {
    let controller: FichasController;
    let spyFichasService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FichasController],
            providers: [
                { provide: FichasService, useValue: fichasServiceMock },
            ],
        }).compile();

        controller = module.get<FichasController>(FichasController);
        spyFichasService = module.get<FichasService>(FichasService);
    });

    it('El Controlador "Fichas" es definido', () => {
        expect(controller).toBeDefined();
    });
    describe('FichasController.findAll', () => {
        it('Debe llamar al metodo "findAll" del servicio "FichasService"', async () => {
            await controller.findAll();
            expect(spyFichasService.findAll).toBeCalled();
        });
    });
    describe('FichasController.findOne', () => {
        it('Debe llamar al metodo "findOne" del servicio "FichasService"', async () => {
            await controller.findOne(1);
            expect(spyFichasService.findOne).toBeCalledWith(1);
        });
    });
    describe('FichasController.create', () => {
        it('Debe llamar al metodo "create" del servicio "FichasService', async () => {
            let ficha: CreateFichaDto;
            await controller.create(ficha);
            expect(spyFichasService.create).toBeCalledWith(ficha);
        });
    });
    describe('FichasController.update', () => {
        it('Debe llamar al metodo "update" del servicio "FichasService', async () => {
            let ficha: UpdateFichaDto;
            await controller.update(1, ficha);
            expect(spyFichasService.update).toBeCalledWith(1, ficha);
        });
    });
    describe('FichasController.remove', () => {
        it('Debe llamar al metodo "remove" del servicio "FichasService', async () => {
            await controller.remove(1);
            expect(spyFichasService.remove).toBeCalledWith(1);
        });
    });
});

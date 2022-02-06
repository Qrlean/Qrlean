import { Test, TestingModule } from '@nestjs/testing';

import { UsuariosController } from '../controller/usuarios.controller';
import { UsuariosService } from '../services/usuarios.service';

import { usuariosServiceMock } from '../../__mocks__/usuarios.service';

import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

describe('UsuariosController', () => {
    let controller: UsuariosController;
    let spyUsuariosService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuariosController],
            providers: [UsuariosService],
        })
            .overrideProvider(UsuariosService)
            .useValue(usuariosServiceMock)
            .compile();

        controller = module.get<UsuariosController>(UsuariosController);
        spyUsuariosService = module.get<UsuariosService>(UsuariosService);
    });

    it('El Controlador "Usuarios" es definido', () => {
        expect(controller).toBeDefined();
    });
    describe('UsuariosController.findAll', () => {
        it('Debe llamar al metodo "findAll" del servicio "UsuariosService"', async () => {
            await controller.findAll();
            expect(spyUsuariosService.findAll).toBeCalled();
        });
    });
    describe('UsuariosController.findOne', () => {
        it('Debe llamar al metodo "findOne" del servicio "UsuariosService"', async () => {
            await controller.findOne(1);
            expect(spyUsuariosService.findOne).toBeCalledWith(1);
        });
    });
    describe('UsuariosController.create', () => {
        it('Debe llamar al metodo "create" del servicio "UsuariosService', async () => {
            let user: CreateUsuarioDto;
            await controller.create(user);
            expect(spyUsuariosService.create).toBeCalledWith(user);
        });
    });
    describe('UsuariosController.update', () => {
        it('Debe llamar al metodo "update" del servicio "UsuariosService', async () => {
            let user: UpdateUsuarioDto;
            await controller.update(1, user);
            expect(spyUsuariosService.update).toBeCalledWith(1, user);
        });
    });
    describe('UsuariosController.remove', () => {
        it('Debe llamar al metodo "remove" del servicio "UsuariosService', async () => {
            await controller.remove(1);
            expect(spyUsuariosService.remove).toBeCalledWith(1);
        });
    });
    describe('UsuariosController.getSelfInformation', () => {
        it('Debe llamar al metodo "findOne" del servicio "UsuariosService', async () => {
            await controller.getSelfInformation({ user: { id_usuario: 1 } });
            expect(spyUsuariosService.findOne).toHaveBeenCalled();
        });
    });
    describe('UsuariosController.findThatNotAreInFicha', () => {
        it('Debe llamar al metodo "findOne" del servicio "UsuariosService', async () => {
            const params = { id_ficha: 1, byTipoRol: 1 };
            await controller.findThatNotAreInFicha(params);
            expect(
                spyUsuariosService.getUsersThatNotAreInFicha,
            ).toHaveBeenCalled();
        });
    });
});

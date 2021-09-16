import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../services/usuarios.service';

describe('UsuariosController', () => {
    let controller: UsuariosController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuariosController],
            providers: [UsuariosService],
        }).compile();

        controller = module.get<UsuariosController>(UsuariosController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

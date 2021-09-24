import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controller/auth.controller';
import { AuthServiceMock } from '../../__mocks__/auth.service';
import { AuthService } from '../services/auth.service';
import { LoginUsuario } from '../dto/login-usuario.dto';
describe('AuthController', () => {
    let controller: AuthController;
    let spyAuthService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: AuthServiceMock,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        spyAuthService = module.get<AuthService>(AuthService);
    });

    it('El Controllador "AuthController" es definido', () => {
        expect(controller).toBeDefined();
    });
    describe('AuthController.login', () => {
        it('Retorna un jwt tipo string', async () => {
            let usuario: LoginUsuario;
            const output = await controller.login({}, usuario);
            expect(output).toEqual(expect.any(String));
        });
        it('Llama el metodo "login" del servicio "authService"', async () => {
            let usuario: LoginUsuario;
            await controller.login({}, usuario);
            expect(spyAuthService.login).toHaveBeenCalled();
        });
    });
});

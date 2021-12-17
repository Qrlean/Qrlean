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
        it('Llama el metodo "login" del servicio "authService"', async () => {
            let usuario: LoginUsuario;
            await controller.login({}, usuario);
            expect(spyAuthService.login).toHaveBeenCalled();
        });
    });
    describe('AuthController.passwordChangeRequest', () => {
        it('LLama el metodo "changePasswordRequest" del servicio "authService"', async () => {
            await controller.passwordChangeRequest({
                id_tipo_documento: 0,
                numero_documento: 0,
            });
            expect(spyAuthService.changePasswordRequest).toHaveBeenCalled();
        });
    });
    describe('AuthController.passwordChange', () => {
        it('LLama el metodo "changePassword" del servicio "authService"', async () => {
            await controller.passwordChange('test', { password: '123' });
            expect(spyAuthService.changePassword).toHaveBeenCalled();
        });
    });
});

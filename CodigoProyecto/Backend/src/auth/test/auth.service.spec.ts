import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';

import { BcryptService } from '../services/bcrypt.service';
import { bcryptServiceMock } from '../../__mocks__/bcrypt.service';

import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { usuariosServiceMock } from '../../__mocks__/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { jwtServiceMock } from '../../__mocks__/jwt.service';
import { Usuario } from '../../usuarios/entities/usuario.entity';

describe('AuthService', () => {
    let service: AuthService;
    let spyUsuariosService;
    let spyBcryptService;
    let spyJwtService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: BcryptService,
                    useValue: bcryptServiceMock,
                },
                {
                    provide: UsuariosService,
                    useValue: usuariosServiceMock,
                },
                {
                    provide: JwtService,
                    useValue: jwtServiceMock,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        spyUsuariosService = module.get<UsuariosService>(UsuariosService);
        spyBcryptService = module.get<BcryptService>(BcryptService);
        spyJwtService = module.get<JwtService>(JwtService);
    });

    it('El Servicio "Auth" es definido', () => {
        expect(service).toBeDefined();
    });
    describe('AuthService.validateUser', () => {
        it('Recibe emailInstitucional y password como parametros y retorna un usuario sin su propiedad "password"', async () => {
            const output = await service.validateUser('', '');
            expect(output).toEqual({
                id_usuario: expect.any(Number),
                nombres_usuario: expect.any(String),
                apellidos_usuario: expect.any(String),
                numero_documento: expect.any(Number),
                emailInstitucional: expect.any(String),
                direccion_residencial: expect.any(String),
                telefono_movil: expect.any(Number),
                id_tipo_documento: expect.any(Number),
                id_tipo_rol: expect.any(Number),
                id_ciudad: expect.any(Number),
            });
        });
        it('Llama el metodo "findOneByProperty" del servicio "UsuariosService"', async () => {
            await service.validateUser('', '');
            expect(spyUsuariosService.findOneByProperty).toHaveBeenCalled();
        });
        it('Llama el metodo "compare" del servicio "BcryptService"', async () => {
            await service.validateUser('', '');
            expect(spyBcryptService.compare).toHaveBeenCalled();
        });
        it('Recibe null en caso de que usuariosService.findOneByProperty no haya hallado el usuario', async () => {
            spyUsuariosService.findOneByProperty.mockResolvedValue(undefined);
            const output = await service.validateUser('', '');
            expect(output).toBeNull();
        });
        it('Recibe null en caso de que bcryptService.compare determine que la contraseña es incorrecta', async () => {
            spyBcryptService.compare.mockResolvedValue(false);
            const output = await service.validateUser('', '');
            expect(output).toBeNull();
        });
    });
    describe('AuthService.login', () => {
        it('Retorna un string (Jwt)', async () => {
            let usuario: Usuario;
            const output = service.login(usuario);
            expect(output).toEqual({ token: expect.any(String) });
        });
        it('Llama el metodo "sign" del servicio "jwtService"', async () => {
            let usuario: Usuario;
            service.login(usuario);
            expect(spyJwtService.sign).toHaveBeenCalled();
        });
    });
});

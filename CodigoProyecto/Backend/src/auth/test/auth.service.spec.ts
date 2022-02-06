import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';

import { BcryptService } from '../services/bcrypt.service';
import { bcryptServiceMock } from '../../__mocks__/bcrypt.service';

import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { usuariosServiceMock } from '../../__mocks__/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { jwtServiceMock } from '../../__mocks__/jwt.service';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { CorreoService } from '../../correo/services/correo.service';
import { BlackListService } from '../services/blacklist.service';
import { correoServiceMock } from '../../__mocks__/correo.service';
import { blackListServiceMock } from '../__mocks__/blacklist.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let spyUsuariosService;
    let spyBcryptService;
    let spyJwtService;
    let spyCorreoService;
    let spyBlackListService;
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
                { provide: CorreoService, useValue: correoServiceMock },
                { provide: BlackListService, useValue: blackListServiceMock },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        spyUsuariosService = module.get<UsuariosService>(UsuariosService);
        spyBcryptService = module.get<BcryptService>(BcryptService);
        spyJwtService = module.get<JwtService>(JwtService);
        spyCorreoService = module.get<CorreoService>(CorreoService);
        spyBlackListService = module.get<BlackListService>(BlackListService);
    });

    it('El Servicio "Auth" es definido', () => {
        expect(service).toBeDefined();
    });
    describe('AuthService.validateUser', () => {
        it('Recibe emailInstitucional y password como parametros y retorna un usuario sin su propiedad "password"', async () => {
            const output = await service.validateUser(1, 1, '');
            expect(output).toMatchObject({
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
        it('Deberia llamar a los servicios UsuariosService.findOneByProperty y BcryptService.compare si existe un usuario', async () => {
            await service.validateUser(1, 1, '');
            expect(spyUsuariosService.findOneByProperty).toHaveBeenCalled();
            expect(spyBcryptService.compare).toHaveBeenCalled();
        });
        it('Retorna null en caso de que usuariosService.findOneByProperty no haya hallado el usuario', async () => {
            spyUsuariosService.findOneByProperty.mockResolvedValue(undefined);
            const output = await service.validateUser(1, 1, '');
            expect(output).toBeNull();
        });
        it('Retorna null en caso de que bcryptService.compare determine que la contraseña es incorrecta', async () => {
            spyBcryptService.compare.mockResolvedValue(false);
            const output = await service.validateUser(1, 1, '');
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
    describe('AuthService.changePasswordRequest', () => {
        it('Llama el metodo "findOneByProperty" del servicio "UsuariosService"', async () => {
            await service.changePasswordRequest(1, 1);
            expect(spyUsuariosService.findOneByProperty).toHaveBeenCalled();
        });

        it('Deberia llamar a los servicios jwtService.signAsync y correoService.sendEmail si existe un usuario"', async () => {
            spyUsuariosService.findOneByProperty.mockReturnValueOnce({});
            await service.changePasswordRequest(1, 1);
            expect(spyJwtService.signAsync).toHaveBeenCalled();
            expect(spyCorreoService.sendEmail).toHaveBeenCalled();
        });
        it('No deberia llamar a los servicios jwtService.signAsync y correoService.sendEmail si no existe un usuario"', async () => {
            jest.clearAllMocks();
            spyUsuariosService.findOneByProperty.mockReturnValueOnce(undefined);
            await service.changePasswordRequest(1, 1);
            expect(spyCorreoService.sendEmail).toHaveBeenCalledTimes(0);
            expect(spyJwtService.signAsync).toHaveBeenCalledTimes(0);
        });
    });
    describe('AuthService.changePassword', () => {
        it('Deberia llamar el servicio "blackListService.tokenIsBlacklisted" ,"jwtService.verifyAsync" ,"bcryptService.hash","usuariosService.userPasswordUpdate","blackListService.tokenSetBlackList"', async () => {
            spyBlackListService.tokenIsBlacklisted.mockReturnValueOnce(false);
            spyJwtService.verifyAsync.mockReturnValueOnce({
                id_usuario: 1,
                id_tipo_documento: 2,
                numero_documento: 3,
                type: '',
            });
            await service.changePassword('', '');

            expect(spyBlackListService.tokenIsBlacklisted).toHaveBeenCalled();
            expect(spyJwtService.verifyAsync).toHaveBeenCalled();
            expect(spyBcryptService.hash).toHaveBeenCalled();
            expect(spyUsuariosService.userPasswordUpdate).toHaveBeenCalled();
            expect(spyBlackListService.tokenSetBlackList).toHaveBeenCalled();
        });

        it('Deberia desencadenar Throw BadRequestException si el token se encuentra en blacklist', async () => {
            jest.clearAllMocks();
            spyBlackListService.tokenIsBlacklisted.mockReturnValueOnce(true);
            await expect(service.changePassword('', '')).rejects.toThrowError(
                BadRequestException,
            );
        });
    });
});

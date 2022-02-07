import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../services/usuarios.service';
import { BcryptService } from '../../auth/services/bcrypt.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../entities/usuario.entity';

import { UsuariosRepositoryMock } from '../__mocks__/usuarios.repository';
import { bcryptServiceMock } from '../../__mocks__/bcrypt.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CorreoService } from '../../correo/services/correo.service';

import { correoServiceMock } from '../../__mocks__/correo.service';
import { userStub } from './stub/user.stub';
describe('UsuariosService', () => {
    let service: UsuariosService;
    let spyServiceBcrypt;
    let spyServiceRepository;
    let spyCorreoService;
    let module: TestingModule;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                UsuariosService,
                {
                    provide: BcryptService,
                    useValue: bcryptServiceMock,
                },
                {
                    provide: getRepositoryToken(Usuario),
                    useClass: UsuariosRepositoryMock,
                },
                {
                    provide: CorreoService,
                    useValue: correoServiceMock,
                },
            ],
        }).compile();
        service = module.get<UsuariosService>(UsuariosService);
        spyServiceBcrypt = module.get<BcryptService>(BcryptService);
        spyServiceRepository = module.get<Repository<Usuario>>(
            getRepositoryToken(Usuario),
        );
        spyCorreoService = module.get<CorreoService>(CorreoService);
    });

    afterEach(async () => {
        await module.close();
    });
    it('El Servicio "Usuarios" es definido', () => {
        expect(service).toBeDefined();
    });
    const userModelExpect = {
        id_usuario: expect.any(Number),
        nombres_usuario: expect.any(String),
        apellidos_usuario: expect.any(String),
        numero_documento: expect.any(Number),
        emailInstitucional: expect.any(String),
        direccion_residencial: expect.any(String),
        telefono_movil: expect.any(Number),
        password: expect.any(String),
        id_tipo_documento: expect.any(Number),
        id_tipo_rol: expect.any(Number),
        id_ciudad: expect.any(Number),
    };
    describe('UsuariosService.create', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
            jest.spyOn(spyServiceRepository, 'create');
            jest.spyOn(spyServiceRepository, 'save');
        });
        it('Deberia retornar un usuario creado con contraseña hasheada e id_usuario', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce(undefined);
            let usuario: CreateUsuarioDto;
            const output = await service.create(usuario);
            expect(output).toBeInstanceOf(Usuario);
            expect(output).toMatchObject(userModelExpect);
        });
        it('Deberia desencadenar Throw BadRequestException si ya existe un usuario con el correo enviado o documento enviado', async () => {
            let usuario: CreateUsuarioDto;
            spyServiceRepository.findOne.mockReturnValueOnce({});
            await expect(service.create(usuario)).rejects.toThrowError(
                BadRequestException,
            );
        });
        it('Deberia llamar a los servicios Repository.create , BcryptService.hash ,Repository.save , Repository.findOne y CorreoService.sendEmail', async () => {
            let usuario: CreateUsuarioDto;
            spyServiceRepository.findOne.mockReturnValueOnce(undefined);
            await service.create(usuario);
            expect(spyServiceRepository.create).toHaveBeenCalled();
            expect(spyServiceBcrypt.hash).toHaveBeenCalled();
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
            expect(spyServiceRepository.save).toHaveBeenCalled();
            expect(spyCorreoService.sendEmail).toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('UsuariosService.findAll', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'find');
        });
        it('Deberia retornar una lista de usuarios', async () => {
            const output = await service.findAll();

            output.forEach((usuario) => {
                expect(usuario).toBeInstanceOf(Usuario);
                expect(usuario).toMatchObject(userModelExpect);
            });
        });
        it('Deberia llamar a los servicios Repository.find', async () => {
            await service.findAll();
            expect(spyServiceRepository.find).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('Usuarios.getUsersThatNotAreInFicha', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'find');
        });
        it('Deberia retornar una lista de usuarios', async () => {
            const output = await service.getUsersThatNotAreInFicha(1, 1);
            console.log(output);
            output.forEach((x) => {
                expect(x).toBeInstanceOf(Usuario);
                expect(x).toMatchObject(userModelExpect);
            });
        });
        it('Deberia llamar a los servicios Repository.find', async () => {
            await service.getUsersThatNotAreInFicha(1, 1);
            expect(spyServiceRepository.find).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('Usuarios.findOne', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar un usuario', async () => {
            const output = await service.findOne(1);
            expect(output).toBeInstanceOf(Usuario);
            expect(output).toMatchObject(userModelExpect);
        });
        it('Deberia desencadenar Throw NotFoundException si no hay un usuario con el id enviado', async () => {
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                return undefined;
            });
            await expect(service.findOne(1)).rejects.toThrowError(
                NotFoundException,
            );
        });
        it('Deberia llamar a los servicios Repository.findOne', async () => {
            await service.findOne(1);
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('Usuarios.update', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'update');
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar un usuario', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce(userStub);
            spyServiceRepository.findOne.mockReturnValueOnce(undefined);
            spyServiceRepository.findOne.mockReturnValueOnce(undefined);
            const usuario: UpdateUsuarioDto = { nombres_usuario: '' };
            const output = await service.update(1, usuario);
            expect(output).toBeInstanceOf(Usuario);
            expect(output).toMatchObject(userModelExpect);
        });

        it('Deberia desencadenar Throw NotFoundException si el usuario no existe', async () => {
            const usuario: UpdateUsuarioDto = { nombres_usuario: '' };
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                return undefined;
            });

            await expect(service.update(1, usuario)).rejects.toThrowError(
                NotFoundException,
            );
        });
        it('Deberia desencadenar Throw BadRequestException si no se envia por lo menos un dato a editar', async () => {
            const usuario: UpdateUsuarioDto = {};
            await expect(service.update(1, usuario)).rejects.toThrowError(
                BadRequestException,
            );
        });
        it('Deberia desencadenar Throw BadRequestException si ya existe un usuario con el correo enviado', async () => {
            const usuario: UpdateUsuarioDto = { nombres_usuario: '' };
            spyServiceRepository.findOne.mockReturnValueOnce({});
            spyServiceRepository.findOne.mockReturnValueOnce({});
            spyServiceRepository.findOne.mockReturnValueOnce(undefined);
            await expect(service.update(1, usuario)).rejects.toThrowError(
                BadRequestException,
            );
        });
        it('Deberia desencadenar Throw BadRequestException si ya existe un usuario con el numero de documento enviado', async () => {
            const usuario: UpdateUsuarioDto = { nombres_usuario: '' };
            spyServiceRepository.findOne.mockReturnValueOnce({});
            spyServiceRepository.findOne.mockReturnValueOnce(undefined);
            spyServiceRepository.findOne.mockReturnValueOnce({});
            await expect(service.update(1, usuario)).rejects.toThrowError(
                BadRequestException,
            );
        });
        it('Deberia llamar a los servicios Repository.update , Repository.findOne , BcryptService.Hash , CorreoService.SendEmail', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce(userStub);
            spyServiceRepository.findOne.mockReturnValueOnce(undefined);
            spyServiceRepository.findOne.mockReturnValueOnce(undefined);
            const usuario: UpdateUsuarioDto = { nombres_usuario: '' };
            await service.update(1, usuario);
            expect(spyServiceBcrypt.hash).toHaveBeenCalled();
            expect(spyCorreoService.sendEmail).toHaveBeenCalled();
            expect(spyServiceRepository.update).toHaveBeenCalled();
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('Usuarios.remove', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'remove');
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar un usuario', async () => {
            const output = await service.remove(1);
            expect(output).toBeInstanceOf(Usuario);
            expect(output).toMatchObject(userModelExpect);
        });
        it('Deberia desencadenar Throw NotFoundException si el usuario no existe', async () => {
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                return undefined;
            });

            await expect(service.remove(1)).rejects.toThrowError(
                NotFoundException,
            );
        });
        it('Deberia llamar a los servicios Repository.findOne y Repository.remove', async () => {
            await service.remove(1);
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
            expect(spyServiceRepository.remove).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('UsuariosService.findOneByProperty', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar un usuario que haga "match" con el objecto', async () => {
            const output = await service.findOneByProperty({ id: 1 });
            expect(output).toBeInstanceOf(Usuario);
            expect(output).toMatchObject(userModelExpect);
        });
        it('Deberia retornar undefined si no hay un usuario que haga "match"', async () => {
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                return undefined;
            });
            const output = await service.findOneByProperty({ id: 1 });
            expect(output).toBeUndefined();
        });
        it('Deberia llamar a los servicios Repository.findOne', async () => {
            await service.findOneByProperty({});
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});

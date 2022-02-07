import { Test, TestingModule } from '@nestjs/testing';
import { FichasService } from '../services/fichas.service';
import { Ficha } from '../entities/ficha.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { fichasRepositoryMock } from '../__mocks__/fichas.repository';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { Repository } from 'typeorm';
import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UpdateFichaDto } from '../dto/update-ficha.dto';
import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { usuariosServiceMock } from '../../__mocks__/usuarios.service';
import { FichaUsuario } from '../entities/fichaUsuario.entity';
import { fichasUsuarioRepositoryMock } from '../__mocks__/ fichasUsuario.repository';
import { AsignaturaFicha } from '../entities/asignaturaFichas.entity';
import { asignaturaFichaRepositoryMock } from '../__mocks__/asignaturaFicha.repository';
import theoretically from 'jest-theories';
import { plainToClass } from 'class-transformer';
import { Usuario } from '../../usuarios/entities/usuario.entity';
describe('FichasService', () => {
    let service: FichasService;
    let spyServiceRepository;
    let spyUsuariosService;
    let spyFichasUsuariosRepository;
    let spyAsignaturaFichaRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FichasService,
                {
                    provide: getRepositoryToken(Ficha),
                    useClass: fichasRepositoryMock,
                },
                {
                    provide: UsuariosService,
                    useValue: usuariosServiceMock,
                },
                {
                    provide: getRepositoryToken(FichaUsuario),
                    useClass: fichasUsuarioRepositoryMock,
                },
                {
                    provide: getRepositoryToken(AsignaturaFicha),
                    useClass: asignaturaFichaRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<FichasService>(FichasService);
        spyServiceRepository = module.get<Repository<Ficha>>(
            getRepositoryToken(Ficha),
        );
        spyUsuariosService = module.get<UsuariosService>(UsuariosService);
        spyFichasUsuariosRepository = module.get<Repository<FichaUsuario>>(
            getRepositoryToken(FichaUsuario),
        );
        spyAsignaturaFichaRepository = module.get<Repository<AsignaturaFicha>>(
            getRepositoryToken(AsignaturaFicha),
        );
    });
    const fichaModelExpect = {
        id_ficha: expect.any(Number),
        id_programa: expect.any(Number),
    };
    it('El Servicio "Fichas" es definido', () => {
        expect(service).toBeDefined();
    });
    describe('FichasService.create', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
            jest.spyOn(spyServiceRepository, 'create');
            jest.spyOn(spyServiceRepository, 'save');
        });
        it('Deberia retornar una ficha creada', async () => {
            let ficha: CreateFichaDto;
            const output = await service.create(ficha);
            expect(output).toBeInstanceOf(Ficha);
            expect(output).toMatchObject(fichaModelExpect);
        });
        it('Deberia llamar a los servicios Repository.create ,Repository.save y Repository.findOne', async () => {
            let ficha: CreateFichaDto;
            await service.create(ficha);
            expect(spyServiceRepository.create).toHaveBeenCalled();
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
            expect(spyServiceRepository.save).toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('FichasService.findAll', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'find');
        });
        it('Deberia retornar una lista de fichas', async () => {
            const output = await service.findAll();
            output.forEach((ficha) => {
                expect(ficha).toBeInstanceOf(Ficha);
                expect(ficha).toMatchObject(fichaModelExpect);
            });
        });
        const theories = [
            { input: 1, expected: fichaModelExpect },
            { input: 2, expected: fichaModelExpect },
            { input: 3, expected: fichaModelExpect },
        ];
        theoretically(
            'Deberia retornar la informacion para el rol {input}',
            theories,
            async (theory) => {
                const output = await service.findAll(
                    theory.input,
                    theory.input,
                );
                output.forEach((ficha) => {
                    expect(ficha).toBeInstanceOf(Ficha);
                    expect(ficha).toMatchObject(fichaModelExpect);
                });
            },
        );
        it('Deberia desencadenar Throw BadRequestException si el rol no existe', async () => {
            await expect(service.findAll(5)).rejects.toThrowError(
                BadRequestException,
            );
        });
        it('Deberia llamar a los servicios Repository.find', async () => {
            await service.findAll();
            expect(spyServiceRepository.find).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('FichasService.findOne', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
            spyServiceRepository.findOne.mockReturnValue(
                plainToClass(Ficha, {
                    id_ficha: 1,
                    id_programa: 1,
                    usuarios: [
                        {
                            id_asociacion_usuario_ficha: 1,
                            id_ficha: 1,
                            id_usuario: 1,
                        },
                    ],
                }),
            );
        });
        it('Deberia retornar una ficha', async () => {
            const output = await service.findOne(1);
            expect(output).toBeInstanceOf(Ficha);
            expect(output).toMatchObject(fichaModelExpect);
        });
        const theories = [
            { input: 1, expected: fichaModelExpect },
            { input: 2, expected: fichaModelExpect },
            { input: 3, expected: fichaModelExpect },
        ];
        theoretically(
            'Deberia retornar la informacion para el rol {input}',
            theories,
            async (theory) => {
                const output = await service.findOne(1, theory.input, 1);
                expect(output).toBeInstanceOf(Ficha);
                expect(output).toMatchObject(fichaModelExpect);
            },
        );
        it('Deberia desencadenar Throw BadRequestException si el rol no existe', async () => {
            await expect(service.findOne(1, 5, 2)).rejects.toThrowError(
                BadRequestException,
            );
        });
        it('Deberia desencadenar Throw BadRequestException si el id de usuario no existe en la ficha', async () => {
            await expect(service.findOne(1, 2, 3)).rejects.toThrowError(
                UnauthorizedException,
            );
        });
        it('Deberia desencadenar Throw NotFoundException si no hay una ficha con el id enviado', async () => {
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
    describe('FichasService.update', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'update');
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar una ficha actualizada', async () => {
            const ficha: UpdateFichaDto = { id_programa: 1234 };
            const output = await service.update(1, ficha);
            expect(output).toBeInstanceOf(Ficha);
            expect(output).toMatchObject(fichaModelExpect);
        });
        it('Deberia desencadenar Throw NotFoundException si la ficha no existe', async () => {
            const ficha: UpdateFichaDto = { id_programa: 1234 };
            spyServiceRepository.findOne.mockImplementationOnce(() => {
                return undefined;
            });

            await expect(service.update(1, ficha)).rejects.toThrowError(
                NotFoundException,
            );
        });
        it('Deberia desencadenar Throw BadRequestException si no se envia por lo menos un dato a editar', async () => {
            const ficha: UpdateFichaDto = {};
            await expect(service.update(1, ficha)).rejects.toThrowError(
                BadRequestException,
            );
        });
        it('Deberia llamar a los servicios Repository.update y Repository.findOne', async () => {
            const ficha: UpdateFichaDto = { id_programa: 1234 };
            await service.update(1, ficha);
            expect(spyServiceRepository.update).toHaveBeenCalled();
            expect(spyServiceRepository.findOne).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('FichasService.remove', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'remove');
            jest.spyOn(spyServiceRepository, 'findOne');
        });
        it('Deberia retornar una ficha', async () => {
            const output = await service.remove(1);
            expect(output).toBeInstanceOf(Ficha);
            expect(output).toMatchObject(fichaModelExpect);
        });
        it('Deberia desencadenar Throw NotFoundException si la ficha no existe', async () => {
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
    describe('FichasService.asociarUsuario', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
            jest.spyOn(spyFichasUsuariosRepository, 'findOne');
            jest.spyOn(spyFichasUsuariosRepository, 'create');
            jest.spyOn(spyFichasUsuariosRepository, 'save');
            jest.spyOn(spyAsignaturaFichaRepository, 'create');
            jest.spyOn(spyAsignaturaFichaRepository, 'save');
            jest.spyOn(service, 'findOne');
        });
        it('Deberia llamar a los servicios findOne,usuariosService.findOne,fichasUsuariosRepository.findOne,fichasUsuariosRepository.create y fichasUsuariosRepository.save si el usuario es aprendiz', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce(
                plainToClass(Ficha, {
                    id_ficha: 1,
                    id_programa: 1,
                    usuarios: [
                        {
                            id_asociacion_usuario_ficha: 1,
                            id_ficha: 1,
                            id_usuario: 1,
                        },
                    ],
                }),
            );
            spyUsuariosService.findOne.mockReturnValueOnce(
                plainToClass(Usuario, {
                    id_usuario: 1,
                    id_tipo_rol: 3,
                }),
            );
            spyFichasUsuariosRepository.findOne.mockReturnValueOnce(undefined);
            await service.asociarUsuario({ id_usuario: 1, id_ficha: 1 });
            expect(service.findOne).toHaveBeenCalled();
            expect(spyUsuariosService.findOne).toHaveBeenCalled();
            expect(spyFichasUsuariosRepository.create).toHaveBeenCalled();
            expect(spyFichasUsuariosRepository.save).toHaveBeenCalled();
            expect(spyAsignaturaFichaRepository.create).toHaveBeenCalledTimes(
                0,
            );
            expect(spyAsignaturaFichaRepository.save).toHaveBeenCalledTimes(0);
        });
        it('Deberia llamar a los servicios findOne,usuariosService.findOne,fichasUsuariosRepository.findOne,fichasUsuariosRepository.create ,fichasUsuariosRepository.save,asignaturaFichaRepository.create y asignaturaFichaRepository.save si el usuario es instructor', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce(
                plainToClass(Ficha, {
                    id_ficha: 1,
                    id_programa: 1,
                    usuarios: [
                        {
                            id_asociacion_usuario_ficha: 1,
                            id_ficha: 1,
                            id_usuario: 1,
                        },
                    ],
                }),
            );
            spyUsuariosService.findOne.mockReturnValueOnce(
                plainToClass(Usuario, {
                    id_usuario: 1,
                    id_tipo_rol: 3,
                }),
            );
            spyFichasUsuariosRepository.findOne.mockReturnValueOnce(undefined);
            await service.asociarUsuario({ id_usuario: 1, id_ficha: 1 });
            expect(service.findOne).toHaveBeenCalled();
            expect(spyUsuariosService.findOne).toHaveBeenCalled();
            expect(spyFichasUsuariosRepository.create).toHaveBeenCalled();
            expect(spyFichasUsuariosRepository.save).toHaveBeenCalled();
            expect(spyAsignaturaFichaRepository.create).toHaveBeenCalledTimes(
                0,
            );
            expect(spyAsignaturaFichaRepository.save).toHaveBeenCalledTimes(0);
        });
        it('Deberia desencadenar Throw BadRequestException si el rol del usuario es 1', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce({});
            spyUsuariosService.findOne.mockReturnValueOnce(
                plainToClass(Usuario, {
                    id_usuario: 1,
                    id_tipo_rol: 1,
                }),
            );
            await expect(
                service.asociarUsuario({ id_usuario: 1, id_ficha: 1 }),
            ).rejects.toThrowError(BadRequestException);
        });
        it('Deberia desencadenar Throw BadRequestException si el rol del usuario es 2 y no se envia un id de asignatura', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce({});
            spyUsuariosService.findOne.mockReturnValueOnce(
                plainToClass(Usuario, {
                    id_usuario: 1,
                    id_tipo_rol: 2,
                }),
            );
            await expect(
                service.asociarUsuario({ id_usuario: 1, id_ficha: 1 }),
            ).rejects.toThrowError(BadRequestException);
        });
        it('Deberia desencadenar Throw BadRequestException si el rol del usuario es diferente de 2 y se envia un id de asignatura', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce({});
            spyUsuariosService.findOne.mockReturnValueOnce(
                plainToClass(Usuario, {
                    id_usuario: 1,
                    id_tipo_rol: 3,
                }),
            );
            await expect(
                service.asociarUsuario({
                    id_usuario: 1,
                    id_ficha: 1,
                    id_asignatura: 2,
                }),
            ).rejects.toThrowError(BadRequestException);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('FichasService.desasociarUsuario', () => {
        beforeEach(() => {
            jest.spyOn(spyServiceRepository, 'findOne');
            jest.spyOn(spyFichasUsuariosRepository, 'findOne');
            jest.spyOn(spyFichasUsuariosRepository, 'remove');
            jest.spyOn(service, 'findOne');
        });
        it('Deberia llamar a los servicios usuariosService.findOne,findOne,fichasUsuariosRepository.findOne y fichasUsuariosRepository.remove', async () => {
            spyServiceRepository.findOne.mockReturnValueOnce({});
            await service.desasociarUsuario(1, 2);
            expect(service.findOne).toHaveBeenCalled();
            expect(spyUsuariosService.findOne).toHaveBeenCalled();
            expect(spyFichasUsuariosRepository.findOne).toHaveBeenCalled();
            expect(spyFichasUsuariosRepository.remove).toHaveBeenCalled();
        });
        it('Deberia desencadenar Throw BadRequestException si el usuario no se encuentra asociado a la ficha', async () => {
            spyFichasUsuariosRepository.findOne.mockReturnValue(undefined);
            await expect(service.desasociarUsuario(1, 2)).rejects.toThrowError(
                BadRequestException,
            );
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});

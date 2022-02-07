import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { UpdateFichaDto } from '../dto/update-ficha.dto';
import { Repository } from 'typeorm';
import { Ficha } from '../entities/ficha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { FichaUsuario } from '../entities/fichaUsuario.entity';
import { AsociarUsuario } from '../dto/asociar-usuario.dto';
import { AsignaturaFicha } from '../entities/asignaturaFichas.entity';
import { Asistencia } from '../../asistencias/entities/asistencia.entity';

@Injectable()
export class FichasService {
    constructor(
        @InjectRepository(Ficha)
        private fichasRepository: Repository<Ficha>,
        private usuariosService: UsuariosService,
        @InjectRepository(FichaUsuario)
        private fichasUsuariosRepository: Repository<FichaUsuario>,
        @InjectRepository(AsignaturaFicha)
        private asignaturaFichaRepository: Repository<AsignaturaFicha>,
    ) {}

    async create(createFichaDto: CreateFichaDto): Promise<Ficha> {
        let ficha = this.fichasRepository.create(createFichaDto);
        ficha = await this.fichasRepository.save(ficha);
        return this.fichasRepository.findOne(ficha.id_ficha, {
            relations: ['programa'],
        });
    }

    async findAll(id_rol?: number, id_usuario?: number): Promise<Ficha[]> {
        let fichas: Ficha[];

        fichas = await this.fichasRepository.find({
            relations: ['programa'],
        });
        if (id_rol) {
            switch (id_rol) {
                case 1:
                    fichas = await this.fichasRepository.find({
                        relations: ['programa', 'usuarios'],
                    });
                    break;
                case 2:
                case 3:
                    fichas = await this.fichasRepository.find({
                        relations: ['programa', 'usuarios'],
                        where: (qb) => {
                            qb.where(
                                '"Ficha__usuarios".id_usuario = :id_usuario',
                                { id_usuario },
                            );
                        },
                    });
                    break;
                default:
                    throw new BadRequestException('El rol enviado no existe');
            }
        }
        return fichas;
    }

    async findOne(id: number, id_rol?: number, id_usuario?: number) {
        let ficha: Ficha;
        ficha = await this.fichasRepository.findOne(id, {
            relations: ['programa'],
        });
        if (id_rol && id_usuario) {
            switch (id_rol) {
                case 1:
                case 2:
                    ficha = await this.fichasRepository.findOne(id, {
                        relations: [
                            'programa',
                            'usuarios',
                            'usuarios.usuario',
                            'asignaturas',
                            'asignaturas.instructor',
                            'asignaturas.asignatura',
                            'asignaturas.clases',
                            'asignaturas.clases.asistencias',
                            'asignaturas.clases.asistencias.aprendiz',
                            'asignaturas.clases.asistencias.aprendiz.usuario',
                        ],
                        where: (qb) => {
                            qb.orderBy(
                                '"Ficha__usuarios__usuario".id_tipo_rol',
                            );
                            qb.orderBy(
                                '"Ficha__usuarios__usuario".nombres_usuario',
                            );
                        },
                    });
                    break;

                case 3:
                    ficha = await this.fichasRepository.findOne(id, {
                        relations: [
                            'programa',
                            // 'usuarios',
                            'asignaturas',
                            'asignaturas.asignatura',
                            'asignaturas.clases',
                            // 'asignaturas.clases.asistencias',
                        ],
                        where: (qb) => {
                            qb.leftJoinAndMapMany(
                                'Ficha.usuarios',
                                FichaUsuario,
                                'fu',
                                '"Ficha".id_ficha = fu.id_ficha AND fu.id_usuario = :id_usuario',
                                { id_usuario },
                            );
                            qb.leftJoinAndMapMany(
                                'Ficha__asignaturas__clases.asistencias',
                                Asistencia,
                                'a',
                                '"Ficha__asignaturas__clases".id_clase = a.id_clase AND fu.id_usuario = a.id_aprendiz',
                            );
                        },
                    });
                    break;
                default:
                    throw new BadRequestException('El rol enviado no existe');
            }
            if (ficha && (id_rol === 2 || id_rol === 3)) {
                if (!ficha.usuarios.find((x) => x.id_usuario === id_usuario)) {
                    throw new UnauthorizedException(
                        'El usuario no posee el permiso ver para esta ficha',
                    );
                }
            }
        }
        if (!ficha) {
            throw new NotFoundException(`La ficha con id ${id} no existe.`);
        }
        return ficha;
    }

    async update(id: number, updateFichaDto: UpdateFichaDto) {
        const ficha = await this.fichasRepository.findOne(id);
        if (!ficha) {
            throw new NotFoundException(`La ficha con id ${id} no existe.`);
        }
        if (Object.keys(updateFichaDto).length === 0) {
            throw new BadRequestException(
                'Deberia enviar por lo menos un campo',
            );
        }
        await this.fichasRepository.update(id, updateFichaDto);
        return this.fichasRepository.findOne(id, {
            relations: ['programa'],
        });
    }

    async remove(id: number) {
        const ficha = await this.fichasRepository.findOne(id);
        if (!ficha) {
            throw new NotFoundException(`La ficha con id ${id} no existe.`);
        }
        return this.fichasRepository.remove(ficha);
    }

    async asociarUsuario(asociarUsuarioDto: AsociarUsuario) {
        const ficha = await this.findOne(asociarUsuarioDto.id_ficha);
        const usuario = await this.usuariosService.findOne(
            asociarUsuarioDto.id_usuario,
        );
        if (usuario.id_tipo_rol === 1) {
            throw new BadRequestException(
                'Un administrador no puede ser asociado a una ficha',
            );
        }
        if (usuario.id_tipo_rol === 2 && !asociarUsuarioDto.id_asignatura) {
            throw new BadRequestException(
                'Un instructor deberia enviar una asignatura para ser asociado',
            );
        }
        if (asociarUsuarioDto.id_asignatura && usuario.id_tipo_rol !== 2) {
            throw new BadRequestException(
                'Solo los instructores pueden tener una asignatura asociada',
            );
        }
        const existeAsociacion = await this.fichasUsuariosRepository.findOne({
            where: {
                id_usuario: asociarUsuarioDto.id_usuario,
                id_ficha: asociarUsuarioDto.id_ficha,
            },
        });
        if (existeAsociacion) {
            throw new BadRequestException(
                'El usuario ya se encuentra asociado a la ficha',
            );
        }
        let asociacion = this.fichasUsuariosRepository.create({
            id_ficha: ficha.id_ficha,
            id_usuario: usuario.id_usuario,
        });
        asociacion = await this.fichasUsuariosRepository.save(asociacion);
        if (asociarUsuarioDto.id_asignatura) {
            const asignturaFicha = this.asignaturaFichaRepository.create({
                id_asignatura: asociarUsuarioDto.id_asignatura,
                id_ficha: ficha.id_ficha,
                id_instructor: asociacion.id_asociacion_usuario_ficha,
            });
            await this.asignaturaFichaRepository.save(asignturaFicha);
        }
        return;
    }

    async desasociarUsuario(id_ficha, id_usuario): Promise<void> {
        await this.usuariosService.findOne(id_usuario);
        await this.findOne(id_ficha);
        const usuarioFicha = await this.fichasUsuariosRepository.findOne({
            where: { id_usuario, id_ficha },
        });
        if (!usuarioFicha) {
            throw new BadRequestException(
                `El usuario con id ${id_usuario} no se encuentra asociado a la ficha con id ${id_ficha}`,
            );
        }
        await this.fichasUsuariosRepository.remove(usuarioFicha);
    }
}

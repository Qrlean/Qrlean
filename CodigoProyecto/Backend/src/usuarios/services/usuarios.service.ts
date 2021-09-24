import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { BcryptService } from '../../auth/services/bcrypt.service';
import { uuid } from 'uuidv4';
import { CorreoService } from '../../correo/services/correo.service';
import { Templates } from '../../correo/enum/templates.enum';
@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usersRepository: Repository<Usuario>,
        private bcryptService: BcryptService,
        private correoService: CorreoService,
    ) {}

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        try {
            let user = this.usersRepository.create(createUsuarioDto);
            const userExistsEmail = await this.usersRepository.findOne({
                emailInstitucional: user.emailInstitucional,
            });
            const userExistsNumeroDocumento =
                await this.usersRepository.findOne({
                    numero_documento: user.numero_documento,
                });
            if (userExistsEmail || userExistsNumeroDocumento) {
                throw new BadRequestException(
                    'Ya hay un usuario registrado con los parametros enviados (emailInstitucional | numero_documento)',
                );
            }
            const uuidG = uuid();
            await this.correoService.sendEmail(
                { password: uuidG, ...user },
                'Creación de cuenta',
                Templates.newUser,
            );
            console.log(uuidG);
            user.password = await this.bcryptService.hash(uuidG);
            user = await this.usersRepository.save(user);
            return await this.usersRepository.findOne(user.id_usuario, {
                relations: ['tipo_documento', 'rol', 'ciudad'],
            });
        } catch (e) {
            // console.log(e);
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException(
                'Error creando el usuario, intente de nuevo más tarde',
            );
        }
    }

    async findAll(): Promise<Usuario[]> {
        try {
            return await this.usersRepository.find({
                relations: [
                    'tipo_documento',
                    'rol',
                    'ciudad',
                    'fichas',
                    'fichas.ficha',
                    'fichas.ficha.programa',
                ],
            });
        } catch (e) {
            throw new InternalServerErrorException(
                'Error al intentar consultar usuarios , intente de nuevo más tarde.',
            );
        }
    }

    async findOne(id: number): Promise<Usuario> {
        try {
            const user = await this.usersRepository.findOne(id, {
                relations: ['tipo_documento', 'rol', 'ciudad'],
            });
            if (!user) {
                throw new NotFoundException(
                    `El usuario con id ${id} no existe.`,
                );
            }
            return user;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException(
                'Error al intentar consultar el usuario , intente de nuevo más tarde.',
            );
        }
    }

    // async Search() {

    // }

    async update(
        id: number,
        updateUsuarioDto: UpdateUsuarioDto,
    ): Promise<Usuario> {
        try {
            const user = await this.usersRepository.findOne(id);
            if (!user) {
                throw new NotFoundException(
                    `El usuario con id ${id} no existe.`,
                );
            }
            if (Object.keys(updateUsuarioDto).length === 0) {
                throw new BadRequestException(
                    'Deberia enviar por lo menos un campo',
                );
            }
            const userExistsEmail = await this.usersRepository.findOne({
                id_usuario: Not(id),
                emailInstitucional: updateUsuarioDto?.emailInstitucional,
            });
            const userExistsNumeroDocumento =
                await this.usersRepository.findOne({
                    id_usuario: Not(id),
                    numero_documento: updateUsuarioDto?.numero_documento,
                });

            if (userExistsEmail || userExistsNumeroDocumento) {
                throw new BadRequestException(
                    'Ya hay un usuario registrado con los parametros enviados (emailInstitucional | numero_documento)',
                );
            }

            await this.usersRepository.update(id, updateUsuarioDto);
            return await this.usersRepository.findOne(id, {
                relations: ['tipo_documento', 'rol', 'ciudad'],
            });
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException(
                'Error al intentar actualizar el usuario , intente de nuevo más tarde.',
            );
        }
    }

    async remove(id: number): Promise<Usuario> {
        try {
            const user = await this.usersRepository.findOne(id);
            if (!user) {
                throw new NotFoundException(
                    `El usuario con id ${id} no existe.`,
                );
            }
            return await this.usersRepository.remove(user);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException(
                'Error al intentar eliminar el usuario , intente de nuevo más tarde.',
            );
        }
    }

    async findOneByProperty(property): Promise<Usuario | undefined> {
        return await this.usersRepository.findOne(property, {
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
    }
}

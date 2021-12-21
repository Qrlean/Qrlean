import {
    BadRequestException,
    Injectable,
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
        let user = this.usersRepository.create(createUsuarioDto);
        const userExists = await this.usersRepository.findOne({
            where: [
                { emailInstitucional: user.emailInstitucional },
                {
                    numero_documento: user.numero_documento,
                },
            ],
        });
        if (userExists) {
            throw new BadRequestException(
                'Ya hay un usuario registrado con los parametros enviados (emailInstitucional | numero_documento)',
            );
        }
        const uuidG = uuid();

        console.log(uuidG);
        user.password = await this.bcryptService.hash(uuidG);
        user = await this.usersRepository.save(user);
        user = await this.usersRepository.findOne(user.id_usuario, {
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
        await this.correoService.sendEmail(
            user.emailInstitucional,
            {
                numero_documento: user.numero_documento,
                tipoDeDoc: user.tipo_documento.nombre_tipo_documento,
                password: uuidG,
            },
            'Creación de cuenta',
            Templates.newUser,
        );
        return user;
    }

    async findAll(): Promise<Usuario[]> {
        return this.usersRepository.find({
            relations: [
                'tipo_documento',
                'rol',
                'ciudad',
                'fichas',
                'fichas.ficha',
                'fichas.ficha.programa',
            ],
        });
    }

    async findOne(id: number): Promise<Usuario> {
        const user = await this.usersRepository.findOne(id, {
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
        if (!user) {
            throw new NotFoundException(`El usuario con id ${id} no existe.`);
        }
        return user;
    }

    async update(
        id: number,
        updateUsuarioDto: UpdateUsuarioDto,
    ): Promise<Usuario> {
        const user = await this.usersRepository.findOne(id, {
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
        if (!user) {
            throw new NotFoundException(`El usuario con id ${id} no existe.`);
        }
        if (Object.keys(updateUsuarioDto).length === 0) {
            throw new BadRequestException(
                'Deberia enviar por lo menos un campo',
            );
        }
        const userExistsEmail = await this.usersRepository.findOne({
            id_usuario: Not(id),
            emailInstitucional: updateUsuarioDto.emailInstitucional,
        });
        const userExistsNumeroDocumento = await this.usersRepository.findOne({
            id_usuario: Not(id),
            numero_documento: updateUsuarioDto.numero_documento,
        });

        if (userExistsEmail || userExistsNumeroDocumento) {
            throw new BadRequestException(
                'Ya hay un usuario registrado con los parametros enviados (emailInstitucional | numero_documento)',
            );
        }
        const password = uuid();
        const passwordHash = await this.bcryptService.hash(password);
        await this.correoService.sendEmail(
            user.emailInstitucional,
            {
                numero_documento: user.numero_documento,
                tipoDeDoc: user.tipo_documento.nombre_tipo_documento,
                password: password,
            },
            'Edicion de tu cuenta',
            Templates.userEdit,
        );
        await this.usersRepository.update(id, {
            ...updateUsuarioDto,
            password: passwordHash,
        });
        return this.usersRepository.findOne(id, {
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
    }

    async remove(id: number): Promise<Usuario> {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`El usuario con id ${id} no existe.`);
        }
        return this.usersRepository.remove(user);
    }

    async findOneByProperty(property): Promise<Usuario | undefined> {
        return this.usersRepository.findOne(property, {
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
    }
    async userPasswordUpdate(
        id_usuario: number,
        newPassword: string,
    ): Promise<void> {
        await this.usersRepository.update(id_usuario, {
            password: newPassword,
        });
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usersRepository: Repository<Usuario>,
    ) {}

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario[]> {
        let user = this.usersRepository.create(createUsuarioDto);
        user.password = '1';
        user = await this.usersRepository.save(user);
        return await this.usersRepository.find({
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
    }

    async findAll() {
        return await this.usersRepository.find({
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOne(id, {
            relations: ['tipo_documento', 'rol', 'ciudad'],
        });
        if (!user) {
            throw new NotFoundException(`El usuario con id ${id} no existe.`);
        }
        return user;
    }

    // async Search() {

    // }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const newUser = await this.usersRepository.update(id, updateUsuarioDto);
        if (newUser.affected === 0) {
            throw new NotFoundException(`El usuario con id ${id} no existe.`);
        }
        return await this.usersRepository.findOne(id);
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`El usuario con id ${id} no existe.`);
        }
        return await this.usersRepository.remove(user);
    }
}

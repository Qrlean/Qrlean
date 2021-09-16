import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return await this.usuariosService.create(createUsuarioDto);
    }

    @Get()
    async findAll() {
        return await this.usuariosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.usuariosService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUsuarioDto: UpdateUsuarioDto,
    ) {
        return await this.usuariosService.update(id, updateUsuarioDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.usuariosService.remove(id);
    }
}

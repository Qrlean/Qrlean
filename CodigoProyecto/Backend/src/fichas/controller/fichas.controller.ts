import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
    ParseIntPipe,
    UseGuards,
    Req,
} from '@nestjs/common';
import { FichasService } from '../services/fichas.service';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { UpdateFichaDto } from '../dto/update-ficha.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/roles/roles.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AsociarUsuario } from '../dto/asociar-usuario.dto';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('fichas')
export class FichasController {
    constructor(private readonly fichasService: FichasService) {}

    @Roles(Role.Administrador)
    @Post()
    create(@Body() createFichaDto: CreateFichaDto) {
        return this.fichasService.create(createFichaDto);
    }

    @Roles(Role.Administrador)
    @Get()
    findAll() {
        return this.fichasService.findAll();
    }

    @Roles(Role.Administrador, Role.Instructor, Role.Aprendiz)
    @Get(':id')
    findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.fichasService.findOne(
            id,
            req.user.id_tipo_rol,
            req.user.id_usuario,
        );
    }

    @Roles(Role.Administrador)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFichaDto: UpdateFichaDto,
    ) {
        return this.fichasService.update(id, updateFichaDto);
    }

    @Roles(Role.Administrador)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.fichasService.remove(+id);
    }

    @Post('/asociarUsuario')
    asociarUsuario(@Body() asociarUsuarioDto: AsociarUsuario) {
        return this.fichasService.asociarUsuario(asociarUsuarioDto);
    }
}

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
} from '@nestjs/common';
import { FichasService } from '../services/fichas.service';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { UpdateFichaDto } from '../dto/update-ficha.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/roles/roles.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('fichas')
export class FichasController {
    constructor(private readonly fichasService: FichasService) {}

    @Roles(Role.Administrador)
    @Post()
    create(@Body() createFichaDto: CreateFichaDto) {
        return this.fichasService.create(createFichaDto);
    }

    @Roles(Role.Administrador, Role.Instructor)
    @Get()
    findAll() {
        return this.fichasService.findAll();
    }

    @Roles(Role.Administrador, Role.Administrador, Role.Aprendiz)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.fichasService.findOne(id);
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
}
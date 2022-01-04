import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ClasesService } from '../services/clases.service';
import { CreateClaseDto } from '../dto/create-clase.dto';
import { UpdateClaseDto } from '../dto/update-clase.dto';

import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-auth.guard';
import { Role } from '../../auth/roles/roles.enum';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Instructor)
@Controller('clases')
export class ClasesController {
    constructor(private readonly clasesService: ClasesService) {}

    @Post()
    create(@Req() req, @Body() createClaseDto: CreateClaseDto) {
        return this.clasesService.create(createClaseDto, req.user.id_usuario);
    }

    @Get('/allByAsignaturaId/:id')
    findAll(@Param('id') id: string) {
        return this.clasesService.findAllByAsignaturaId(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clasesService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clasesService.remove(+id);
    }
}

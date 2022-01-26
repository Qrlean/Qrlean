import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AsignaturasService } from '../services/asignaturas.service';

import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-auth.guard';
import { Role } from '../../auth/roles/roles.enum';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('asignaturas')
export class AsignaturasController {
    constructor(private readonly asignaturasService: AsignaturasService) {}

    @Roles(Role.Administrador)
    @Get()
    findAll() {
        return this.asignaturasService.findAll();
    }

    @Roles(Role.Instructor)
    @Get('/asignaturaFicha/:id')
    findOneAsignaturaFicha(@Req() req, @Param('id') id: string) {
        return this.asignaturasService.findOneAsignaturaFicha(
            +id,
            req.user.id_usuario,
        );
    }
}

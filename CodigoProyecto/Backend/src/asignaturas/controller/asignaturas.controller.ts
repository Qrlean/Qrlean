import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-auth.guard';
import { Role } from '../../auth/roles/roles.enum';
import { AsignaturasService } from '../services/asignaturas.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Administrador)
@Controller('asignaturas')
export class AsignaturasController {
    constructor(private readonly asignaturasService: AsignaturasService) {}

    @Get()
    findAll() {
        return this.asignaturasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.asignaturasService.findOne(+id);
    }
}

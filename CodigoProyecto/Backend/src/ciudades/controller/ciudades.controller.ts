import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CiudadesService } from '../services/ciudades.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/roles/roles.enum';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Administrador)
@Controller('ciudades')
export class CiudadesController {
    constructor(private readonly ciudadesService: CiudadesService) {}

    @Get()
    findAll() {
        return this.ciudadesService.findAll();
    }
}

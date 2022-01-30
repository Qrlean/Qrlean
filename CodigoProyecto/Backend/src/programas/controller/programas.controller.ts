import {
    Controller,
    Get,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
} from '@nestjs/common';
import { ProgramasService } from '../services/programas.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/roles/roles.enum';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Administrador)
@Controller('programas')
export class ProgramasController {
    constructor(private readonly programasService: ProgramasService) {}
    @Get()
    findAll() {
        return this.programasService.findAll();
    }
}

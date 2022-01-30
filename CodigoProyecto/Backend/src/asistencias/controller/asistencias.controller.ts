import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AsistenciasService } from '../services/asistencias.service';
import { CreateBulkAsistenciaDto } from '../dto/create-bulk-asistencia.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/roles/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Instructor)
@Controller('asistencias')
export class AsistenciasController {
    constructor(private readonly asistenciasService: AsistenciasService) {}

    @Post('bulk/clase/:id_clase')
    createBulk(
        @Body() createAsistenciaBulkDto: CreateBulkAsistenciaDto,
        @Req() req,
        @Param('id_clase', ParseIntPipe) id_clase: number,
    ) {
        return this.asistenciasService.signAsistencias(
            id_clase,
            req.user.id_usuario,
            createAsistenciaBulkDto,
        );
    }
    @Get('/getAsistenciasByClase/:id_clase')
    getAsistencias(
        @Req() req,
        @Param('id_clase', ParseIntPipe) id_clase: number,
    ) {
        return this.asistenciasService.getAsistenciasByClase(
            id_clase,
            req.user.id_usuario,
        );
    }
    // @Post
    // createAprendiz() {}
}

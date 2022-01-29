import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AsistenciasService } from '../services/asistencias.service';
import { CreateBulkAsistenciaDto } from '../dto/create-bulk-asistencia.dto';

@Controller('asistencias')
export class AsistenciasController {
    constructor(private readonly asistenciasService: AsistenciasService) {}

    @Post('bulk/clase/:id_clase')
    createBulk(
        @Body() createAsistenciaBulkDto: CreateBulkAsistenciaDto,
        @Param('id_clase', ParseIntPipe) id_clase: number,
    ) {
        return this.asistenciasService.signAsistencias(
            id_clase,
            createAsistenciaBulkDto,
        );
    }

    // @Post
    // createAprendiz() {}
}

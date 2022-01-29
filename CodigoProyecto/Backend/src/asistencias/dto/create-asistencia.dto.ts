import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAsistenciaDto {
    @ApiProperty()
    @IsNumber()
    id_tipo_asistencia: number;

    @ApiProperty()
    @IsNumber()
    id_asociacion_usuario_ficha: number;
}

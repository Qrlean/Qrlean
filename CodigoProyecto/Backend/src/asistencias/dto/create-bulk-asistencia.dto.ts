import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateAsistenciaDto } from './create-asistencia.dto';

export class CreateBulkAsistenciaDto {
    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAsistenciaDto)
    asistencias: CreateAsistenciaDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsMilitaryTime, IsNumber, IsString } from 'class-validator';

export class CreateClaseDto {
    @ApiProperty()
    @IsString()
    nombre_clase: string;

    @ApiProperty()
    @IsISO8601()
    dia: string;

    @ApiProperty()
    @IsMilitaryTime()
    hora_inicio: string;

    @ApiProperty()
    @IsMilitaryTime()
    hora_final: string;
}

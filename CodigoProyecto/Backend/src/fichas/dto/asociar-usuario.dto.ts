import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { NumberLength } from 'src/decorators/NumberLength';

export class AsociarUsuario {
    @ApiProperty()
    @IsNumber()
    id_usuario: number;

    @ApiProperty()
    @IsNumber()
    id_ficha: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_asignatura?: number;
}

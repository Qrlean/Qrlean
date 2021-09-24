import { NumberLength } from '../../decorators/NumberLength';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFichaDto {
    @ApiProperty()
    @IsNumber()
    @NumberLength(1, 3)
    id_programa: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { NumberLength } from '../../decorators/NumberLength';
export class ChangePasswordRequest {
    @ApiProperty()
    @IsNumber()
    @NumberLength(1, 2)
    id_tipo_documento: number;

    @ApiProperty()
    @IsNumber()
    @NumberLength(4, 20)
    // @UserExits()
    numero_documento: number;
}

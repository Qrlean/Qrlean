import { ApiProperty } from '@nestjs/swagger';
import { Matches, Length, IsEmail, IsNumber } from 'class-validator';
import { NumberLength } from '../../decorators/NumberLength';

export class CreateUsuarioDto {
    @ApiProperty()
    @Matches(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
    )
    @Length(5, 30)
    nombres_usuario: string;

    @ApiProperty()
    @Matches(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
    )
    @Length(5, 30)
    apellidos_usuario: string;

    @ApiProperty()
    @IsNumber()
    @NumberLength(4, 20)
    // @UserExits()
    numero_documento: number;

    @ApiProperty()
    @IsEmail()
    // @UserExits()
    emailInstitucional: string;

    @ApiProperty()
    @Matches(/^[\x00-\xFC]*$/)
    @Length(5, 60)
    direccion_residencial: string;

    @ApiProperty()
    @IsNumber()
    @NumberLength(5, 11)
    telefono_movil: number;

    @ApiProperty()
    @IsNumber()
    @NumberLength(1, 2)
    id_tipo_documento: number;

    @ApiProperty()
    @NumberLength(1, 2)
    @IsNumber()
    id_tipo_rol: number;

    @ApiProperty()
    @IsNumber()
    @NumberLength(1, 2)
    id_ciudad: number;
}

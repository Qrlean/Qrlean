import { ApiProperty } from '@nestjs/swagger';
export class LoginUsuario {
    @ApiProperty()
    numero_documento: number;

    @ApiProperty()
    id_tipo_documento: number;

    @ApiProperty()
    password: string;
}

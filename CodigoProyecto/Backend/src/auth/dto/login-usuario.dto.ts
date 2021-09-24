import { ApiProperty } from '@nestjs/swagger';
export class LoginUsuario {
    @ApiProperty()
    emailInstitucional: string;
    @ApiProperty()
    password: string;
}

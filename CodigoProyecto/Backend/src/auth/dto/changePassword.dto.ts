import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class ChangePassword {
    @ApiProperty()
    @Matches(/^[\x00-\xFC]*$/)
    password: string;
}

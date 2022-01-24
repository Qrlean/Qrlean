import Query from '../../dto/query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export default class QueryUsersFichaAdmin extends Query {
    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    byTipoRol: number;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    id_ficha: number;
}

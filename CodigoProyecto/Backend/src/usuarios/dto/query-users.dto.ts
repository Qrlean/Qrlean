import Query from '../../dto/query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';

export default class QueryUsers extends Query {
    @ApiModelPropertyOptional()
    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    byTipoRol?: number;
}

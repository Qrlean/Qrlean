import { Module } from '@nestjs/common';
import { LodashService } from './services/lodash.service';

@Module({
    providers: [LodashService],
    exports: [LodashService],
})
export class LodashModule {}

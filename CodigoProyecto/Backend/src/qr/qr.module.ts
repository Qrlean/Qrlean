import { Module } from '@nestjs/common';
import { QrService } from './services/qr.service';

@Module({
    providers: [QrService],
    exports: [QrService],
})
export class QrModule {}

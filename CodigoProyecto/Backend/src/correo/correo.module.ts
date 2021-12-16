import { Module } from '@nestjs/common';
import { CorreoService } from './services/correo.service';

@Module({
    providers: [CorreoService],
    exports: [CorreoService],
})
export class CorreoModule {}

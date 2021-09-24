import { Module } from '@nestjs/common';
import { CorreoService } from './services/correo.service';
import { HandlebarsService } from './services/handlebars.service';

@Module({
    providers: [CorreoService, HandlebarsService],
    exports: [CorreoService],
})
export class CorreoModule {}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Templates } from '../enum/templates.enum';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { HandlebarsService } from './handlebars.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');
// import sgMail from '@sendgrid/mail';
@Injectable()
export class CorreoService {
    constructor(private handlebarsService: HandlebarsService) {}
    async sendEmail(
        usuario: Usuario,
        asunto: string,
        template: Templates,
    ): Promise<void> {
        try {
            const html = await this.handlebarsService.handlebarsReplace(
                template,
                usuario,
            );
            sgMail.setApiKey(process.env.SEND_GRID_KEY);
            const msg = {
                to: usuario.emailInstitucional,
                from: process.env.EMAIL_USER,
                subject: asunto,
                html,
            };
            await sgMail.send(msg);
        } catch (error) {
            throw new InternalServerErrorException('Error enviando el correo');
        }
    }
}

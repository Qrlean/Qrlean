import { Injectable } from '@nestjs/common';
import { Templates } from '../enum/templates.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');
@Injectable()
export class CorreoService {
    async sendEmail(
        to: string,
        body: Record<string, unknown>,
        asunto: string,
        template: Templates,
    ): Promise<void> {
        sgMail.setApiKey(process.env.SEND_GRID_KEY);
        const msg = {
            template_id: template,
            to,
            from: process.env.EMAIL_USER,
            subject: asunto,
            dynamic_template_data: body,
        };
        await sgMail.send(msg);
    }
}

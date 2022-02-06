import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CorreoService } from '../services/correo.service';
import { Templates } from '../enum/templates.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');
describe('CorreoService', () => {
    let service: CorreoService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot()],
            providers: [CorreoService],
        }).compile();
        service = module.get<CorreoService>(CorreoService);
    });
    it('El Servicio "Correo" es definido', () => {
        expect(service).toBeDefined();
    });
    describe('CorreoService.sendEmail', () => {
        beforeEach(() => {
            jest.spyOn(sgMail, 'setApiKey');
            jest.spyOn(sgMail, 'send');
        });
        it('Deberia llamar el metodo "setApiKey","send" del package "sgMail" (sendMail)', async () => {
            sgMail.send.mockReturnValueOnce(true);
            await service.sendEmail('', {}, 'Testing', Templates.newUser);
            expect(sgMail.setApiKey).toHaveBeenCalled();
            expect(sgMail.send).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});

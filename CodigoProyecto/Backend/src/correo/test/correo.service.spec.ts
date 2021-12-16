import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CorreoService } from '../services/correo.service';
import { userStub } from '../../usuarios/test/stub/user.stub';
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
        it('Llama el metodo "setApiKey","send" del package "sgMail" (sendMail)', async () => {
            await service.sendEmail(userStub, 'Testing', Templates.newUser);
            expect(sgMail.setApiKey).toHaveBeenCalled();
            expect(sgMail.send).toHaveBeenCalled();
        });
        it('Throws Error si "sgMail.send" falla', async () => {
            sgMail.send = jest.fn().mockImplementation(() => {
                throw new Error('');
            });
            await expect(
                service.sendEmail(userStub, 'Testing', Templates.newUser),
            ).rejects.toThrowError(Error);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});

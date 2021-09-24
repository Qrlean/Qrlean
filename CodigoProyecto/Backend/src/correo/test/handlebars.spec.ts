import { JwtSecretRequestType } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { HandlebarsService } from '../services/handlebars.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import handlebars from 'handlebars';
import { Templates } from '../enum/templates.enum';

describe('HandlebarsService', () => {
    let service: HandlebarsService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HandlebarsService],
        }).compile();
        service = module.get<HandlebarsService>(HandlebarsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('HandlebarsService.readHTMLFile', () => {
        beforeEach(() => {
            jest.spyOn(fs, 'readFile');
        });
        it('Retorna un string', async () => {
            const output = await service.readHTMLFile(
                path.resolve(__dirname, `../templates/newUser.html`),
            );
            expect(output).toEqual(expect.any(String));
        });
        it('LLama a la funcion readFile del modulo fs', async () => {
            await service.readHTMLFile(
                path.resolve(__dirname, `../templates/newUser.html`),
            );
            expect(fs.readFile).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
    describe('HandlebarsService.handlebarsReplace', () => {
        beforeEach(() => {
            jest.spyOn(handlebars, 'compile');
            jest.spyOn(path, 'resolve');
        });
        it('Retorna un string correspondiente al html compilado', async () => {
            const output = await service.handlebarsReplace(
                Templates.newUser,
                {},
            );
            expect(output).toEqual(expect.any(String));
        });
        it('LLama al metodo "resolve" del modulo path', async () => {
            await service.handlebarsReplace(Templates.newUser, {});
            expect(path.resolve).toHaveBeenCalled();
        });
        it('LLama al metodo "compile" del modulo handlebars', async () => {
            await service.handlebarsReplace(Templates.newUser, {});
            expect(handlebars.compile).toHaveBeenCalled();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});

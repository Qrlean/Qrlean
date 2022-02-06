import { Test, TestingModule } from '@nestjs/testing';
import { TimeService } from '../services/time.service';
import * as moment from 'moment';
describe('TimeService', () => {
    let service: TimeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TimeService],
        }).compile();

        service = module.get<TimeService>(TimeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    //
    describe('TimeService.stringToMoment', () => {
        it('Deberia retornar un valor de tipo moment', () => {
            const output = service.stringToMoment('2002-02-02');
            expect(output).toStrictEqual(moment('2002-02-02'));
        });
    });
    describe('TimeService.dayAndHourToMoment', () => {
        it('Deberia retornar un moment con el dia y hora especificados como params', () => {
            const output = service.dayAndHourToMoment('2020-02-02', '02:02:00');
            expect(output).toStrictEqual(moment('2020-02-02').add('02:02:00'));
        });
    });
    describe('TimeService.momentIsBeforeNow', () => {
        it('Deberia retornar true si la fecha es antes de hoy', () => {
            const output = service.momentIsBeforeNow(moment('2020-02-02'));
            expect(output).toBe(true);
        });
        it('Deberia retornar false si la fecha no es antes de hoy', () => {
            const output = service.momentIsBeforeNow(
                moment(Date.now()).add(1, 'hour'),
            );
            expect(output).toBe(false);
        });
    });
    describe('TimeService.endMomentIsBeforeStartMoment', () => {
        it('Deberia retornar false si la segunda fecha no es antes de la primera fecha', () => {
            const output = service.endMomentIsBeforeStartMoment(
                moment('2002-02-02'),
                moment('2003-02-02'),
            );
            expect(output).toBe(false);
        });
        it('Deberia retornar true si la segunda fecha es antes de la primera fecha', () => {
            const output = service.endMomentIsBeforeStartMoment(
                moment('2002-02-02'),
                moment('2001-02-02'),
            );
            expect(output).toBe(true);
        });
    });
    describe('TimeService.startDateEndDateDiff30Mins', () => {
        it('Deberia retornar true si la segunda fecha es 30 min despues de la primera fecha', () => {
            const output = service.startDateEndDateDiff30Mins(
                moment(Date.now()),
                moment(Date.now()).add(1, 'hour'),
            );
            expect(output).toBe(true);
        });
        it('Deberia retornar false si la segunda fecha no es 30 min despues de la primera fecha', () => {
            const output = service.startDateEndDateDiff30Mins(
                moment(Date.now()),
                moment(Date.now()).subtract(1, 'hour'),
            );
            expect(output).toBe(false);
        });
    });
    describe('TimeService.diffBetweenMoments', () => {
        it('Retorna la diferencia entre dos moments', () => {
            const output = service.diffBetweenMoments(
                moment(Date.now()),
                moment(Date.now()).subtract(1, 'hour'),
            );
            expect(output).toBe(3600000);
        });
    });
});

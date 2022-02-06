import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class TimeService {
    stringToMoment(date: string): moment.Moment {
        return moment(date);
    }
    dayAndHourToMoment(day: string, hour: string): moment.Moment {
        return moment(day).add(hour);
    }
    momentIsBeforeNow(date: moment.Moment): boolean {
        return date.diff(moment(Date.now())) <= 0;
    }
    endMomentIsBeforeStartMoment(
        dateStart: moment.Moment,
        dateEnd: moment.Moment,
    ) {
        return dateStart.diff(dateEnd) >= 0;
    }
    startDateEndDateDiff30Mins(
        dateX: moment.Moment,
        dateY: moment.Moment,
    ): boolean {
        return dateY.diff(dateX) >= 1800000;
    }
    diffBetweenMoments(dateX: moment.Moment, dateY: moment.Moment): number {
        return dateX.diff(dateY, null, true);
    }
}

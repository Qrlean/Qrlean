import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
@Injectable()
export class LodashService {
    orderBy = _.orderBy;
}

import { plainToClass } from 'class-transformer';
import { JwtBlackList } from '../../entities/jwtBlackList.entity';
export const jwtBlackListStub = plainToClass(JwtBlackList, {
    id_black_list_token: 1,
    jwtToken: 'dfkgajdfgsknjkn234',
});

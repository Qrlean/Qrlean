import { MockModel } from '../../database/test/support/mock.repository';
import { JwtBlackList } from '../entities/jwtBlackList.entity';
import { jwtBlackListStub } from '../test/stub/jwtBlackList.stub';
export class JwtBlackListRepositoryMock extends MockModel<JwtBlackList> {
    protected entityStub = jwtBlackListStub;
}

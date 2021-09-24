import { MockModel } from '../../database/test/support/mock.repository';
import { fichaStub } from '../test/stub/ficha.stub';
import { Ficha } from '../entities/ficha.entity';
export class fichasRepositoryMock extends MockModel<Ficha> {
    protected entityStub: Ficha = fichaStub;
}

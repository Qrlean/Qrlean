import { MockModel } from '../../database/test/support/mock.repository';
import { programaStub } from '../test/stub/programa.stub';
import { Programa } from '../entities/programas.entity';
export class ProgramasRepositoryMock extends MockModel<Programa> {
    protected entityStub: Programa = programaStub;
}

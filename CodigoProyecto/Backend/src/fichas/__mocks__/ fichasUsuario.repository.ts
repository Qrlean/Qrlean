import { MockModel } from '../../database/test/support/mock.repository';
import { FichaUsuario } from '../entities/fichaUsuario.entity';
import { fichaUsuarioStub } from '../test/stub/fichaUsuario.stub';
export class fichasUsuarioRepositoryMock extends MockModel<FichaUsuario> {
    protected entityStub: FichaUsuario = fichaUsuarioStub;
}

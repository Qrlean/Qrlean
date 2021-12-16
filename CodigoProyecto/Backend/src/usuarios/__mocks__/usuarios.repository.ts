import { MockModel } from '../../database/test/support/mock.repository';
import { Usuario } from '../entities/usuario.entity';
import { userStub } from '../test/stub/user.stub';
export class UsuariosRepositoryMock extends MockModel<Usuario> {
    protected entityStub: Usuario = userStub;
}

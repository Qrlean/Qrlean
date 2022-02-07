import { MockModel } from '../../database/test/support/mock.repository';
import { AsignaturaFicha } from '../entities/asignaturaFichas.entity';
import { asignaturaFichaStub } from '../test/stub/asignaturaFicha.stub';
export class asignaturaFichaRepositoryMock extends MockModel<AsignaturaFicha> {
    protected entityStub: AsignaturaFicha = asignaturaFichaStub;
}

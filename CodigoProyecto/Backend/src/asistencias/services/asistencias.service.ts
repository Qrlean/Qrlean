import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from '../dto/update-asistencia.dto';

@Injectable()
export class AsistenciasService {
    create(createAsistenciaDto: CreateAsistenciaDto) {
        return 'This action adds a new asistencia';
    }

    findAll() {
        return `This action returns all asistencias`;
    }

    findOne(id: number) {
        return `This action returns a #${id} asistencia`;
    }

    update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
        return `This action updates a #${id} asistencia`;
    }

    remove(id: number) {
        return `This action removes a #${id} asistencia`;
    }
}

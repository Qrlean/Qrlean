import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
} from '@nestjs/common';
import { CreateBulkAsistenciaDto } from '../dto/create-bulk-asistencia.dto';
import { ClasesService } from '../../clases/services/clases.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from '../entities/asistencia.entity';
import { Repository } from 'typeorm';
import { TimeService } from '../../time/services/time.service';

@Injectable()
export class AsistenciasService {
    constructor(
        @Inject(forwardRef(() => ClasesService))
        private clasesService: ClasesService,
        @InjectRepository(Asistencia)
        private asistenciaRepository: Repository<Asistencia>,
        private timeService: TimeService,
    ) {}

    async signAsistencias(
        id_clase: number,
        id_instructor: number,
        createAsistenciaBulkDto: CreateBulkAsistenciaDto,
    ): Promise<void> {
        const clase = await this.clasesService.findOne(
            id_clase,
            id_instructor,
            [
                'asignatura.ficha',
                'asignatura.ficha.usuarios',
                'asignatura.ficha.usuarios.usuario',
                'asistencias.aprendiz',
                'asistencias.aprendiz.usuario',
            ],
        );
        for (const usuario of createAsistenciaBulkDto.asistencias) {
            const exitsUser = clase.asignatura.ficha.usuarios.find(
                (x) =>
                    x.id_asociacion_usuario_ficha ===
                    usuario.id_asociacion_usuario_ficha,
            );

            if (!exitsUser) {
                throw new BadRequestException(
                    `El usuario con id ${usuario.id_asociacion_usuario_ficha} no existe`,
                );
            }
            let assistance: Asistencia;
            assistance = await clase.asistencias.find(
                (x) =>
                    x.id_aprendiz === usuario.id_asociacion_usuario_ficha &&
                    x.aprendiz.usuario.id_tipo_rol === 3,
            );
            if (assistance) {
                assistance.id_tipo_asistencia = usuario.id_tipo_asistencia;
            } else {
                assistance = this.asistenciaRepository.create({
                    id_tipo_asistencia: usuario.id_tipo_asistencia,
                    id_clase: id_clase,
                    id_aprendiz: usuario.id_asociacion_usuario_ficha,
                });
            }
            await this.asistenciaRepository.save(assistance);
        }
    }

    async signAsistenciaAprendiz(id_aprendiz, id_clase): Promise<void> {
        //El id de aprendiz debe venir desde el controllador
        const clase = await this.clasesService.findOne(id_clase, null, [
            'asignatura.ficha',
            'asignatura.ficha.usuarios',
            'asignatura.ficha.usuarios.usuario',
            'asistencias.aprendiz',
            'asistencias.aprendiz.usuario',
        ]);
        const aprendizClase = clase.asignatura.ficha.usuarios.find(
            (x) => x.usuario.id_usuario === id_aprendiz,
        );
        if (!aprendizClase) {
            throw new BadRequestException(
                `El aprendiz no se encuentra asociado a la clase con id ${id_clase}`,
            );
        }
        if (!clase.qr_available) {
            throw new BadRequestException(
                'La clase no permite la firma de asistencia por alumnos',
            );
        }
        const momentInicial = this.timeService.dayAndHourToMoment(
            clase.dia,
            clase.hora_inicio.toString(),
        );
        const momentFinal = this.timeService.dayAndHourToMoment(
            clase.dia,
            clase.hora_final.toString(),
        );
        if (this.timeService.momentIsBeforeNow(momentFinal)) {
            throw new BadRequestException('La clase ya finalizo');
        }
        if (!this.timeService.momentIsBeforeNow(momentInicial)) {
            throw new BadRequestException('La clase no ha iniciado');
        }
        const asistencia = clase.asistencias.find(
            (x) => x.id_aprendiz === aprendizClase.id_asociacion_usuario_ficha,
        );
        if (!asistencia || asistencia.id_tipo_asistencia === 1) {
            const asistenciaNueva = await this.asistenciaRepository.create({
                id_aprendiz: aprendizClase.id_asociacion_usuario_ficha,
                id_tipo_asistencia: 3,
                clase: id_clase,
            });
            await this.asistenciaRepository.save(asistenciaNueva);
        } else {
            throw new BadRequestException(
                'El usuario ya posee un estado de asistencia ,por favor comuniquese con el instructor de la clase',
            );
        }
    }
    createAsistencia(
        id_asociacion_usuario_ficha: number,
        id_clase: number,
        id_tipo_asistencia: number,
    ) {
        const newAsistencia = this.asistenciaRepository.create({
            id_clase,
            id_aprendiz: id_asociacion_usuario_ficha,
            id_tipo_asistencia,
        });
        return this.asistenciaRepository.save(newAsistencia);
    }
    async getAsistenciasByClase(
        id_clase: number,
        id_instructor,
    ): Promise<Asistencia[]> {
        await this.clasesService.findOne(id_clase, id_instructor);
        return this.asistenciaRepository.find({
            relations: [
                'aprendiz',
                'aprendiz.usuario',
                'clase',
                'tipoAsistencia',
            ],
            where: {
                id_clase,
            },
        });
    }
}

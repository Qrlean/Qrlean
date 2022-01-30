import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClaseDto } from '../dto/create-clase.dto';
import { Clase } from '../entities/clase.entity';
import { Repository } from 'typeorm';
import { AsignaturaFicha } from '../../fichas/entities/asignaturaFichas.entity';
import { TimeService } from '../../time/services/time.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CorreoService } from '../../correo/services/correo.service';
import { CronJob } from 'cron';
import { Templates } from '../../correo/enum/templates.enum';
import { AsistenciasService } from '../../asistencias/services/asistencias.service';

@Injectable()
export class ClasesService {
    constructor(
        @InjectRepository(Clase) private clasesRepository: Repository<Clase>,
        @InjectRepository(AsignaturaFicha)
        private asignaturaFichaRepository: Repository<AsignaturaFicha>,
        private timeService: TimeService,
        private schedulerRegistry: SchedulerRegistry,
        private correoService: CorreoService,
        @Inject(forwardRef(() => AsistenciasService))
        private asistenciasService: AsistenciasService,
    ) {}

    async create(
        createClaseDto: CreateClaseDto,
        id_asociacion_asignatura_ficha: number,
        id_instructor: number,
    ): Promise<Clase> {
        const asignaturaFicha = await this.asignaturaFichaRepository.findOne(
            id_asociacion_asignatura_ficha,
            {
                relations: ['instructor'],
            },
        );

        //Verificamos que la asignatura enviada exista
        if (!asignaturaFicha) {
            throw new BadRequestException('La asignatura enviada no existe');
        }
        //Verificamos que el instructor que este intentando crear una clase sea el encargado de la asignatura
        if (asignaturaFicha.instructor.id_usuario !== id_instructor) {
            throw new UnauthorizedException(
                'No posee permisos para crear una clase en esta asignatura , solo el instructor a cargo de la asignatura puede hacerlo',
            );
        }
        const dateStart = this.timeService.dayAndHourToMoment(
            createClaseDto.dia,
            createClaseDto.hora_inicio,
        );
        const dateEnd = this.timeService.dayAndHourToMoment(
            createClaseDto.dia,
            createClaseDto.hora_final,
        );
        //Validamos si la fecha inicial es después de la fecha actual
        if (this.timeService.momentIsBeforeNow(dateStart)) {
            throw new BadRequestException(
                'La fecha inicial (dia + hora de inicio) debería ser después de la dia y hora actual ',
            );
        }
        //Validamos si la fecha de inicio es después de la fecha final
        if (this.timeService.endMomentIsBeforeStartMoment(dateStart, dateEnd)) {
            throw new BadRequestException(
                'La hora inicial debería ser antes de la hora final',
            );
        }
        if (!this.timeService.startDateEndDateDiff30Mins(dateStart, dateEnd)) {
            throw new BadRequestException(
                'La hora inicial y la hora final deberían tener una diferencia de por lo menos 30 minutos',
            );
        }

        //Verificamos si existe una clase en el rango de horas enviado (solo aplica para clases de la misma asignatura)
        const exitsClassWithTheSameHour = await this.clasesRepository.query(
            `SELECT * FROM public.clase WHERE (((dia = $1 AND ($2 BETWEEN hora_inicio AND hora_final)) OR (dia = $1 AND  ($3 BETWEEN hora_inicio AND hora_final))  OR (dia = $1 AND  ($2 <= hora_final AND $3 >= hora_inicio))) AND id_asociacion_asignatura_ficha = $4)`,
            [
                createClaseDto.dia,
                createClaseDto.hora_inicio,
                createClaseDto.hora_final,
                id_asociacion_asignatura_ficha,
            ],
        );
        if (exitsClassWithTheSameHour.length !== 0) {
            throw new BadRequestException(
                'Ya posee una clase en el rango de horas elegido , por favor escoja un rango de horas diferente',
            );
        }
        const newClase = this.clasesRepository.create({
            ...createClaseDto,
            id_asociacion_asignatura_ficha: id_asociacion_asignatura_ficha,
        });
        let claseSaved = await this.clasesRepository.save(newClase);
        claseSaved = await this.clasesRepository.findOne(claseSaved.id_clase, {
            relations: [
                'asignatura',
                'asignatura.asignatura',
                'asignatura.ficha',
                'asignatura.ficha.usuarios',
                'asignatura.ficha.usuarios.usuario',
            ],
        });
        const dateEndLess5Min = dateEnd.minute(dateEnd.minutes() - 5).toDate();
        const jobFiveMinutesLess = new CronJob(dateEndLess5Min, () => {
            claseSaved.asignatura.ficha.usuarios.forEach(async (user) => {
                if (user.usuario.id_tipo_rol === 3) {
                    await this.correoService.sendEmail(
                        user.usuario.emailInstitucional,
                        { nombre_clase: claseSaved.nombre_clase },
                        'Tu tiempo se acaba',
                        Templates.fiveMinutesLess,
                    );
                }
            });
        });

        //Se le avisa a los alumnos de la clase nueva (via email)
        for (const user of claseSaved.asignatura.ficha.usuarios) {
            if (user.usuario.id_tipo_rol === 3) {
                await this.correoService.sendEmail(
                    user.usuario.emailInstitucional,
                    {
                        nombre_clase: claseSaved.nombre_clase,
                        nombre_asignatura:
                            claseSaved.asignatura.asignatura.nombre_asignatura,
                        dia: this.timeService
                            .stringToMoment(createClaseDto.dia)
                            .locale('es')
                            .format('MMMM, dddd [de] YYYY'),
                        hora_inicio: dateStart.format('hh:mm:ss A'),
                        hora_fin: dateEnd.format('hh:mm:ss A'),
                        aprox: dateStart.locale('es').fromNow(),
                    },
                    'Tu tiempo se acaba',
                    Templates.newClass,
                );
                await this.asistenciasService.createAsistencia(
                    user.id_asociacion_usuario_ficha,
                    claseSaved.id_clase,
                    1,
                );
            }
        }
        this.schedulerRegistry.addCronJob(
            `${claseSaved.id_clase}-sysAdvice`,
            jobFiveMinutesLess,
        );
        //Pendiente agregar job para cuando termine el tiempo avise a los estudiantes que no firmaron asistencia
        return this.clasesRepository.findOne(claseSaved.id_clase);
    }

    async findAllByAsignaturaId(
        id_asignatura,
        id_instructor?: number,
    ): Promise<Clase[]> {
        const clases = await this.clasesRepository.find({
            where: { id_asociacion_asignatura_ficha: id_asignatura },
        });
        const asignatura = await this.asignaturaFichaRepository.findOne(
            id_asignatura,
            {
                relations: [
                    'ficha',
                    'ficha.usuarios',
                    'ficha.usuarios.usuario',
                ],
            },
        );
        if (!asignatura) {
            throw new NotFoundException(
                'La asignatura enviada no existe en la ficha',
            );
        }
        if (
            id_instructor &&
            !asignatura.ficha.usuarios.find(
                (x) =>
                    x.id_usuario === id_instructor &&
                    x.usuario.id_tipo_rol === 2,
            )
        ) {
            throw new UnauthorizedException(
                'El usuario no pertenece a la ficha o no es instructor',
            );
        }
        return clases;
    }

    async findOne(
        id: number,
        id_instructor?: number,
        relations?: string[],
    ): Promise<Clase> {
        const claseWUsers = await this.clasesRepository.findOne(id, {
            relations: [
                'asignatura',
                'asignatura.ficha',
                'asignatura.ficha.usuarios',
                'asignatura.ficha.usuarios.usuario',
            ],
        });
        const clase = await this.clasesRepository.findOne(id, {
            relations: [
                'asignatura',
                'asignatura.asignatura',
                'asistencias',
                ...(relations && [...relations]),
            ],
        });
        if (!clase) {
            throw new NotFoundException(`La clase con el id ${id} no existe`);
        }
        if (
            id_instructor &&
            !claseWUsers.asignatura.ficha.usuarios.find(
                (x) =>
                    x.id_usuario === id_instructor &&
                    x.usuario.id_tipo_rol === 2,
            )
        ) {
            throw new UnauthorizedException(
                'El usuario no pertenece a la ficha o no es instructor',
            );
        }
        return clase;
    }

    async remove(id: number): Promise<void> {
        const clase = await this.clasesRepository.findOne(id);
        if (!clase) {
            throw new NotFoundException(`La clase con id ${id} no existe`);
        }

        if (
            this.schedulerRegistry.doesExists(
                'cron',
                `${clase.id_clase}-sysAdvice`,
            )
        )
            this.schedulerRegistry.deleteCronJob(`${clase.id_clase}-sysAdvice`);
        await this.clasesRepository.remove(clase);
        return;
    }
}

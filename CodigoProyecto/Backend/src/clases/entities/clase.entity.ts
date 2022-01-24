import { Asistencia } from '../../asistencias/entities/asistencia.entity';
import {
    AfterLoad,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AsignaturaFicha } from '../../fichas/entities/asignaturaFichas.entity';

@Entity()
export class Clase {
    @PrimaryGeneratedColumn()
    id_clase: number;

    @Column()
    nombre_clase: string;

    @Column({ type: 'date' })
    dia: string;

    @Column({ type: 'time' })
    hora_inicio: Date;

    @Column({ type: 'time' })
    hora_final: Date;

    @Column('boolean', { default: false })
    qr_available = false;

    @Column()
    id_asociacion_asignatura_ficha: number;

    @ManyToOne(
        () => AsignaturaFicha,
        (asignaturaFicha) => asignaturaFicha.clases,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    @JoinColumn({ name: 'id_asociacion_asignatura_ficha' })
    asignatura: AsignaturaFicha;

    @OneToMany(() => Asistencia, (asistencia) => asistencia.clase)
    asistencias: Asistencia[];

    porFirmar = 0;
    inasistencia = 0;
    asistencia = 0;
    asistenciaConRetardo = 0;
    inasistenciaConExcusa = 0;

    @AfterLoad()
    countOfAsistencias() {
        if (this.asistencias) {
            this.asistencias.forEach((x) => {
                switch (x.id_tipo_asistencia) {
                    case 1:
                        this.porFirmar += 1;
                        break;
                    case 2:
                        this.inasistencia += 1;
                        break;
                    case 3:
                        this.asistencia += 1;
                        break;
                    case 4:
                        this.asistenciaConRetardo += 1;
                        break;
                    case 5:
                        this.inasistenciaConExcusa += 1;
                        break;
                }
            });
        }
    }
}

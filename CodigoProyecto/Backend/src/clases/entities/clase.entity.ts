import { Asistencia } from '../../asistencias/entities/asistencia.entity';
import {
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
}

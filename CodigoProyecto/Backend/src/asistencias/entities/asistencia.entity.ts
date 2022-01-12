import { FichaUsuario } from '../../fichas/entities/fichaUsuario.entity';
import { TipoAsistencia } from './tipo_asistencias.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Clase } from '../../clases/entities/clase.entity';

@Entity()
export class Asistencia {
    @PrimaryGeneratedColumn()
    id_asistencia: number;

    @Column({ type: 'timestamptz' })
    hora_firmada: string;

    @Column()
    id_clase: number;

    @Column()
    id_tipo_asistencia: number;

    @Column()
    id_aprendiz: number;

    @ManyToOne(() => Clase, (clase) => clase.asistencias)
    @JoinColumn({ name: 'id_clase' })
    clase: Clase;

    @ManyToOne(
        () => TipoAsistencia,
        (tipoAsistencia) => tipoAsistencia.asistencias,
    )
    @JoinColumn({ name: 'id_tipo_asistencia' })
    tipoAsistencia: TipoAsistencia;

    @ManyToOne(() => FichaUsuario, (fichaUsuario) => fichaUsuario.asistencias)
    @JoinColumn({ name: 'id_aprendiz' })
    aprendiz: FichaUsuario;
}

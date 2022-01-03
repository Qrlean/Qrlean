import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ficha } from './ficha.entity';
import { fichaUsuario } from './fichaUsuario.entity';
import { Asignatura } from '../../asignaturas/entities/asignatura.entity';

@Entity({ name: 'asociacion_asignatura_fichas' })
export class AsignaturaFicha {
    @PrimaryGeneratedColumn()
    id_asociacion_asignatura_ficha: number;

    @Column()
    id_ficha: number;

    @Column()
    id_instructor: number;

    @Column()
    id_asignatura: number;

    @ManyToOne(() => Ficha, (ficha) => ficha.asignaturas, { nullable: false })
    @JoinColumn({ name: 'id_ficha' })
    ficha: Ficha;

    @ManyToOne(() => fichaUsuario, (usuario) => usuario.asignaturas, {
        nullable: false,
    })
    @JoinColumn({ name: 'id_instructor' })
    instructor: Usuario;

    @ManyToOne(() => Asignatura, (asigntura) => asigntura.fichas, {
        nullable: false,
    })
    @JoinColumn({ name: 'id_asignatura' })
    asignatura: Asignatura;
}

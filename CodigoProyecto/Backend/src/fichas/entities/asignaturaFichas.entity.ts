import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ficha } from './ficha.entity';
import { FichaUsuario } from './fichaUsuario.entity';
import { Asignatura } from '../../asignaturas/entities/asignatura.entity';
import { Clase } from '../../clases/entities/clase.entity';

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

    @ManyToOne(() => Ficha, (ficha) => ficha.asignaturas, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_ficha' })
    ficha: Ficha;

    @ManyToOne(() => FichaUsuario, (usuario) => usuario.asignaturas, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_instructor' })
    instructor: Usuario;

    @ManyToOne(() => Asignatura, (asigntura) => asigntura.fichas, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_asignatura' })
    asignatura: Asignatura;

    @OneToMany(() => Clase, (clase) => clase.asignatura)
    clases: Clase[];
}

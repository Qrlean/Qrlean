import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Programa } from '../../programas/entities/programas.entity';
import { FichaUsuario } from './fichaUsuario.entity';
import { AsignaturaFicha } from './asignaturaFichas.entity';

@Entity()
export class Ficha {
    @PrimaryGeneratedColumn()
    id_ficha: number;

    @Column()
    id_programa: number;

    @ManyToOne(() => Programa, (programa) => programa.fichas, {
        nullable: false,
    })
    @JoinColumn({ name: 'id_programa' })
    programa: Programa;

    @OneToMany(() => FichaUsuario, (ficha) => ficha.ficha)
    usuarios: FichaUsuario[];

    @OneToMany(() => AsignaturaFicha, (ficha) => ficha.ficha)
    asignaturas: AsignaturaFicha;
}

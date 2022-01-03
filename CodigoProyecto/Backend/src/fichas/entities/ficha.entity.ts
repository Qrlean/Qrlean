import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Programa } from './programas.entity';
import { fichaUsuario } from './fichaUsuario.entity';
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

    @OneToMany(() => fichaUsuario, (ficha) => ficha.ficha)
    usuarios: fichaUsuario[];

    @OneToMany(() => AsignaturaFicha, (ficha) => ficha.ficha)
    asignaturas: AsignaturaFicha;
}

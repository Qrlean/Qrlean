import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
} from 'typeorm';
import { Programa } from './programas.entity';
import { fichaUsuario } from './fichaUsuario.entity';
import { OneToMany } from 'typeorm';
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
}

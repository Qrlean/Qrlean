import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AsignaturaFicha } from '../../fichas/entities/asignaturaFichas.entity';

@Entity()
export class Asignatura {
    @PrimaryGeneratedColumn()
    id_asignatura: number;

    @Column()
    nombre_asignatura: string;

    @OneToMany(() => AsignaturaFicha, (ficha) => ficha.asignatura, {
        nullable: false,
    })
    fichas: AsignaturaFicha;
}

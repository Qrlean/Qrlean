import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Ficha } from './ficha.entity';
@Entity()
export class Programa {
    @PrimaryGeneratedColumn()
    id_programa: number;

    @Column({ nullable: false, length: 100 })
    nombre_programa: string;

    @OneToMany(() => Ficha, (ficha) => ficha.programa)
    fichas: Ficha[];
}

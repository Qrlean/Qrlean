import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Asignatura {
    @PrimaryGeneratedColumn()
    id_asignatura: number;

    @Column()
    nombre_asignatura: string;
}

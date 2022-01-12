import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asistencia } from './asistencia.entity';
@Entity()
export class TipoAsistencia {
    @PrimaryGeneratedColumn()
    id_tipo_asistencia: number;

    @Column()
    nombre_tipo_asistencia: string;

    @OneToMany(() => Asistencia, (asistencia) => asistencia.tipoAsistencia)
    asistencias: Asistencia[];
}

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ficha } from './ficha.entity';
import { OneToMany } from 'typeorm';
import { AsignaturaFicha } from './asignaturaFichas.entity';
import { Asistencia } from '../../asistencias/entities/asistencia.entity';

@Entity({ name: 'asociacion_usuarios_fichas' })
export class FichaUsuario {
    @PrimaryGeneratedColumn()
    id_asociacion_usuario_ficha: number;

    @Column()
    id_ficha: number;

    @Column()
    id_usuario: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.fichas, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @ManyToOne(() => Ficha, (ficha) => ficha.usuarios, { nullable: false })
    @JoinColumn({ name: 'id_ficha' })
    ficha: Ficha;

    @OneToMany(
        () => AsignaturaFicha,
        (asignaturaFicha) => asignaturaFicha.instructor,
        { nullable: false },
    )
    asignaturas: AsignaturaFicha[];

    @OneToMany(() => Asistencia, (asistencia) => asistencia.clase)
    asistencias: Asistencia[];
}

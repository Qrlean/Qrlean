import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ficha } from './ficha.entity';

@Entity({ name: 'asociacion_usuarios_fichas' })
export class fichaUsuario {
    @PrimaryGeneratedColumn()
    id_asociacion_usuario_ficha: number;

    @Column()
    id_ficha: number;

    @Column()
    id_usuario: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.fichas, { nullable: false })
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @ManyToOne(() => Ficha, (ficha) => ficha.usuarios, { nullable: false })
    @JoinColumn({ name: 'id_ficha' })
    ficha: Ficha;
}

import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class TipoRoles {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    @PrimaryColumn()
    id_tipo_rol: number;

    @Column({ length: 20 })
    nombre_rol: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];
}

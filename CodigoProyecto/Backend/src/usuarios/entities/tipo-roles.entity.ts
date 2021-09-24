import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
@Entity()
export class Tipo_roles {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    @PrimaryColumn()
    id_tipo_rol: number;

    @Column({ length: 20 })
    nombre_rol: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];
}

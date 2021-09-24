import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
@Entity()
export class Tipo_documento {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    @PrimaryColumn()
    id_tipo_documento: number;

    @Column({ length: 30 })
    nombre_tipo_documento: string;

    @OneToMany(() => Usuario, (usuario) => usuario.tipo_documento)
    usuarios: Usuario[];
}

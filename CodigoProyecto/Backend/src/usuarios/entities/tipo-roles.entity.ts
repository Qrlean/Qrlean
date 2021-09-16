import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
@Entity()
export class Tipo_roles {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    id_tipo_rol: number;

    @Column({ length: 20 })
    nombre_rol: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];
}

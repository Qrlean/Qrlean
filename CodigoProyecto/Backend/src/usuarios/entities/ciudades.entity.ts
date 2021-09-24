import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Departamentos } from './departamentos.entity';
@Entity()
export class Ciudades {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    @PrimaryColumn()
    id_ciudad: number;

    @Column({ length: 30 })
    nombre_ciudad: string;

    @OneToMany(() => Usuario, (usuario) => usuario.ciudad)
    usuarios: Usuario[];

    @ManyToOne(() => Departamentos, (departamentos) => departamentos.ciudades)
    departamento: Departamentos;
}

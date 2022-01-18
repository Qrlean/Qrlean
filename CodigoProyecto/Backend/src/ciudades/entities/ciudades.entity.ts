import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    PrimaryColumn,
    JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Departamentos } from '../../usuarios/entities/departamentos.entity';
@Entity()
export class Ciudades {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    @PrimaryColumn()
    id_ciudad: number;

    @Column({ length: 30 })
    nombre_ciudad: string;

    @Column()
    id_departamento: number;

    @OneToMany(() => Usuario, (usuario) => usuario.ciudad)
    usuarios: Usuario[];

    @ManyToOne(() => Departamentos, (departamentos) => departamentos.ciudades)
    @JoinColumn({ name: 'id_departamento' })
    departamento: Departamentos;
}

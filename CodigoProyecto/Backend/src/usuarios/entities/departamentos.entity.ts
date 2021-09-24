import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Ciudades } from './ciudades.entity';
@Entity()
export class Departamentos {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    @PrimaryColumn()
    id_departamento: number;

    @Column({ length: 30 })
    nombre_departamento: string;

    @OneToMany(() => Ciudades, (ciudades) => ciudades.departamento)
    ciudades: Ciudades[];
}

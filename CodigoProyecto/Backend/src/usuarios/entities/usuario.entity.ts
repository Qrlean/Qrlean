import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Tipo_documento } from './tipo-documento.entity';
import { Tipo_roles } from './tipo-roles.entity';
import { Ciudades } from './ciudades.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({ nullable: false, length: 30 })
    nombres_usuario: string;

    @Column({ nullable: false, length: 30 })
    apellidos_usuario: string;

    @Column({ nullable: false, type: 'bigint', unique: true })
    numero_documento: number;

    @Exclude({ toPlainOnly: true })
    @Column({ select: false, nullable: false, length: 150 })
    password: string;

    @Column({ nullable: false, length: 100, unique: true })
    emailInstitucional: string;

    @Column({ nullable: false, length: 60 })
    direccion_residencial: string;

    @Column({ nullable: false, type: 'bigint' })
    telefono_movil: number;

    @Column()
    id_tipo_documento: number;

    @Column()
    id_tipo_rol: number;

    @Column()
    id_ciudad: number;

    @ManyToOne(() => Tipo_documento, (doc) => doc.usuarios, { nullable: false })
    @JoinColumn({ name: 'id_tipo_documento' })
    tipo_documento: Tipo_documento;

    @ManyToOne(() => Tipo_roles, (roles) => roles.usuarios, { nullable: false })
    @JoinColumn({ name: 'id_tipo_rol' })
    rol: Tipo_roles;

    @ManyToOne(() => Ciudades, (ciudades) => ciudades.usuarios, {
        nullable: false,
    })
    @JoinColumn({ name: 'id_ciudad' })
    ciudad: Ciudades;
}
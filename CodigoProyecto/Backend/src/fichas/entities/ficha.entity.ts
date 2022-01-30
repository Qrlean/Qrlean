import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    OneToMany,
    AfterLoad,
} from 'typeorm';
import { Programa } from '../../programas/entities/programas.entity';
import { FichaUsuario } from './fichaUsuario.entity';
import { AsignaturaFicha } from './asignaturaFichas.entity';

@Entity()
export class Ficha {
    @PrimaryGeneratedColumn()
    id_ficha: number;

    @Column()
    id_programa: number;

    @ManyToOne(() => Programa, (programa) => programa.fichas, {
        nullable: false,
    })
    @JoinColumn({ name: 'id_programa' })
    programa: Programa;

    @OneToMany(() => FichaUsuario, (ficha) => ficha.ficha)
    usuarios: FichaUsuario[];

    @OneToMany(() => AsignaturaFicha, (ficha) => ficha.ficha)
    asignaturas: AsignaturaFicha[];

    porFirmar = 0;
    inasistencia = 0;
    asistencia = 0;
    asistenciaConRetardo = 0;
    inasistenciaConExcusa = 0;

    @AfterLoad()
    countOfAsistencias() {
        if (this.asignaturas) {
            this.asignaturas.forEach((x) =>
                x.clases.map((x) => {
                    x.asistencias?.map((x) => {
                        switch (x.id_tipo_asistencia) {
                            case 1:
                                this.porFirmar += 1;
                                break;
                            case 2:
                                this.inasistencia += 1;
                                break;
                            case 3:
                                this.asistencia += 1;
                                break;
                            case 4:
                                this.asistenciaConRetardo += 1;
                                break;
                            case 5:
                                this.inasistenciaConExcusa += 1;
                                break;
                        }
                    });
                }),
            );
        }
    }
}

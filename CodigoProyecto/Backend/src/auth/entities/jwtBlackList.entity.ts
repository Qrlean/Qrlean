import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'jwtBlackList' })
export class JwtBlackList {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id_black_list_token: number;

    @Column()
    jwtToken: string;
}

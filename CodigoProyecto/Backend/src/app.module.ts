import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FichasModule } from './fichas/fichas.module';
import SeedDatabaseService from './database/seed/seeder';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'React2020*',
            database: 'Qrlean',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: false,
            retryDelay: 3000,
            retryAttempts: 10,
        }),
        UsuariosModule,
        AuthModule,
        FichasModule,
    ],
    controllers: [],
    providers: [SeedDatabaseService],
})
export class AppModule {
    constructor(private readonly seeder: SeedDatabaseService) {
        this.seeder.run();
    }
}

import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FichasModule } from './fichas/fichas.module';
import { CorreoModule } from './correo/correo.module';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // envFilePath: '../.env',
        }),
        TypeOrmModule.forRoot({
            type: <any>(process.env.DATABASE_DRIVER as unknown) || 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            entities: ['dist/**/*.entity.{ts,js}'],
            synchronize: false,
            retryDelay: 3000,
            retryAttempts: 10,
            ssl:
                process.env.NODE_ENV === 'production'
                    ? { rejectUnauthorized: false }
                    : false,
        }),
        UsuariosModule,
        AuthModule,
        FichasModule,
        CorreoModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

import * as dotenv from 'dotenv';
dotenv.config();
export default {
    type: <any>(process.env.DATABASE_DRIVER as unknown) || 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    entities: ['dist/**/*.entity.{ts,js}'],
    migrationsTableName: 'migrations',
    migrations: ['src/database/migrations/*.{ts,js}'],
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
    cli: {
        migrationsDir: 'src/database/migrations',
    },
    seeds: ['src/database/seed/*.{ts,js}'],
};

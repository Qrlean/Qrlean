require('dotenv').config();
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration';
import { UsuariosController } from '../controllers/usuariosController';
import { AuthController } from '../controllers/authController';
import { FichasController } from '../controllers/fichasController';
import { ClasesController } from '../controllers/clasesController';
import { AsistenciasController } from '../controllers/asistenciasController';
import fs from 'fs';
const { sequelize } = require('../config/index');

export default class App {
    private app: Express;
    private authController = new AuthController();
    private usuariosController = new UsuariosController();
    private fichasController = new FichasController();
    private clasesController = new ClasesController();
    private asistenciasController = new AsistenciasController();
    private controllers = [
        this.usuariosController,
        this.authController,
        this.fichasController,
        this.clasesController,
        this.asistenciasController,
    ];
    constructor() {
        this.app = express();
        this.app.use(express.static('public'));
        this.app.use(cors({ origin: true }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(function (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
            req: express.Request,
            res: express.Response,
            next: any,
        ) {
            res.header('X-Powered-By', 'Hecho por Camilo García');
            next();
        });
        this.controllers.forEach((controller) => {
            this.app.use(`/api${controller.path}`, controller.setRoutes());
        });
    }
    public listen(): void {
        this.app.listen(
            process.env.PORT || 8082,
            async (): Promise<void> => {
                console.log(
                    'Servidor conectado en puerto',
                    process.env.PORT || 8082,
                );
            },
        );
    }

    public createDbConfig(): void {
        var json: {} = {
            development: {
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                dialect: 'postgres',
            },
            test: {
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                dialect: 'postgres',
            },
            production: {
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                dialect: 'postgres',
            },
        };
        fs.writeFile(
            path.resolve(__dirname, '../config/config.json'),
            JSON.stringify(json),
            'utf8',
            () => {
                // console.log(
                //     path.resolve(__dirname, '../config/config.json'),
                //     process.env.DATABASE_USER,
                //     process.env.DATABASE_PASSWORD,
                //     process.env.DATABASE,
                //     process.env.DATABASE_HOST,
                //     process.env.DATABASE_PORT,
                // );
            },
        );
    }
    public async sequelize(): Promise<void> {
        try {
            // console.log(sequelize);
            await SequelizeTypescriptMigration.makeMigration(sequelize, {
                outDir: path.join(__dirname, '../migrations'),
                migrationName: 'qrleanMigration',
                preview: false,
            });
        } catch (e) {
            console.log(e);
        }
    }
}

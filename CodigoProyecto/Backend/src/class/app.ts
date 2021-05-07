require('dotenv').config();
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration';
import { UsuariosController } from '../controllers/usuariosController';
import { AuthController } from '../controllers/authController';
import { FichasController } from '../controllers/fichasController';
const { sequelize } = require('../config/index');

export default class App {
    private app: Express;
    private authController = new AuthController();
    private usuariosController = new UsuariosController();
    private fichasController = new FichasController();
    private controllers = [
        this.usuariosController,
        this.authController,
        this.fichasController,
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

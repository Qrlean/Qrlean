require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration';
import { UsuariosController } from '../controllers/usuariosController';
import { AuthController } from '../controllers/authController';
const { sequelize } = require('../config/index');

export default class App {
    private app: any;
    private authController = new AuthController();
    private usuariosController = new UsuariosController();
    private controllers = [this.usuariosController, this.authController];

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
            res.header('X-Powered-By', 'Esfuerzo y mucho stackoverflow');
            next();
        });
        this.controllers.forEach((controller) => {
            this.app.use(`/api${controller.path}`, controller.setRoutes());
        });
    }
    listen(): boolean {
        return this.app.listen(
            process.env.PORT || 8082,
            async (err: any): Promise<Boolean> => {
                console.log(
                    'Servidor conectado en puerto',
                    process.env.PORT || 8082,
                );
                if (err) {
                    return false;
                }
                return true;
            },
        );
    }
    sequelize(): void {
        (async () => {
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
        })();
    }
}

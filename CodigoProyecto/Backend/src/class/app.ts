require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration';
const { sequelize } = require('../config/index');
// import {Usuario} from '../models/usuarios.model';
// import {Ciudades} from '../models/cuidades.model';
// import {Departamento} from '../models/departamentos.models';

export default class App {
    private app: any;
    constructor() {
        this.app = express();
        this.app.use(express.static('public'));
        this.app.use(cors({ origin: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(function (req: any, res: any, next: any) {
            res.header('X-Powered-By', 'Esfuerzo y mucho stackoverflow');
            next();
        });
        // this.app.use("/api",require('./routes/index'))
    }
    listen(): boolean {
        return this.app.listen(
            process.env.PORT || 8080,
            async (err: any): Promise<Boolean> => {
                console.log('Servidor conectado en puerto', process.env.PORT);
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

import { Response, Request, NextFunction, Router } from 'express';
import { validationResult } from 'express-validator';
export enum Methods {
    // eslint-disable-next-line no-unused-vars
    GET = 'GET',
    // eslint-disable-next-line no-unused-vars
    POST = 'POST',
    // eslint-disable-next-line no-unused-vars
    PUT = 'PUT',
    // eslint-disable-next-line no-unused-vars
    DELETE = 'DELETE',
}

export interface IRoute {
    path: string;
    method: Methods;
    handler: (
        // eslint-disable-next-line no-unused-vars
        req: Request,
        // eslint-disable-next-line no-unused-vars
        res: Response,
        // eslint-disable-next-line no-unused-vars
        next?: NextFunction,
    ) => void | Promise<any>;
    localMiddleware: ((
        // eslint-disable-next-line no-unused-vars
        req: Request,
        // eslint-disable-next-line no-unused-vars
        res: Response,
        // eslint-disable-next-line no-unused-vars
        next: NextFunction,
    ) => void)[];
}

export default abstract class Controller {
    public router: Router = Router();
    public abstract path: string;
    public controllerMiddleware: any = (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return this.sendE400(
                res,
                'Los datos requeridos no fueron llenados correctamente',
                errors,
            );
        } else {
            next();
        }
    };
    protected abstract readonly routes: IRoute[] = [];

    public setRoutes = (): Router => {
        for (const route of this.routes) {
            // for (const mw of route.localMiddleware) {
            //     this.router.use(route.path, mw);
            // }
            switch (route.method) {
                case 'GET':
                    this.router.get(
                        route.path,
                        [route.localMiddleware, this.controllerMiddleware],
                        route.handler,
                    );
                    break;
                case 'POST':
                    this.router.post(
                        route.path,
                        [route.localMiddleware, this.controllerMiddleware],
                        route.handler,
                    );
                    break;
                case 'PUT':
                    this.router.put(
                        route.path,
                        [route.localMiddleware, this.controllerMiddleware],
                        route.handler,
                    );
                    break;
                case 'DELETE':
                    this.router.delete(
                        route.path,
                        [route.localMiddleware, this.controllerMiddleware],
                        route.handler,
                    );
                    break;
                default:
                    console.log('not a valid method');
                    break;
            }
        }

        return this.router;
    };
    // these methods below must not be a properties< but methods (no "=>")
    protected sendSuccess(
        res: Response,
        message?: string,
        data?: object,
    ): Response {
        return res.status(200).json({
            ok: true,
            message: message || 'success',
            data: data,
        });
    }

    protected sendE400(
        res: Response,
        message?: string,
        data?: object,
    ): Response {
        return res.status(400).json({
            ok: false,
            message:
                message ||
                'Petición errónea, verifica que hayas enviado los datos requeridos.',
            data,
        });
    }

    protected send500(
        res: Response,
        message?: string,
        data?: object,
    ): Response {
        return res.status(500).json({
            ok: false,
            message: message || 'internal server error',
            data,
        });
    }
}

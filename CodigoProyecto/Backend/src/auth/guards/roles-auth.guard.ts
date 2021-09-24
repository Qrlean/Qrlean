import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/roles.enum';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles: Role[] | undefined =
            this.reflector.getAllAndOverride<Role[]>('roles', [
                context.getHandler(),
                context.getClass(),
            ]);
        if (requiredRoles) {
            const { user }: { user: Usuario } = context
                .switchToHttp()
                .getRequest();
            // console.log(user);
            if (!requiredRoles.find((rol) => rol === user.rol.nombre_rol)) {
                throw new UnauthorizedException(
                    'No posee los permisos necesarios para esta acción.',
                );
            }
        }
        return true;
    }
}

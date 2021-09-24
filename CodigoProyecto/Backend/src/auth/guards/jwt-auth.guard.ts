import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        // console.log(err, user, info);
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}

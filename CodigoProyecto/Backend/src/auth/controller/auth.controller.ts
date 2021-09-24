import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LoginUsuario } from '../dto/login-usuario.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req, @Body() userLogin: LoginUsuario) {
        return this.authService.login(req.user);
    }
}

import {
    Controller,
    Request,
    Post,
    UseGuards,
    Body,
    Query,
} from '@nestjs/common';
import { ChangePasswordRequest } from '../dto/changePasswordRequest.dto';
import { LoginUsuario } from '../dto/login-usuario.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { ChangePassword } from '../dto/changePassword.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    login(@Request() req, @Body() userLogin: LoginUsuario) {
        return this.authService.login(req.user);
    }

    @Post('auth/passwordChangeRequest')
    passwordChangeRequest(
        @Body() changePasswordRequest: ChangePasswordRequest,
    ) {
        this.authService.changePasswordRequest(
            changePasswordRequest.id_tipo_documento,
            changePasswordRequest.numero_documento,
        );
        return;
    }
    @Post('auth/passwordChange')
    passwordChange(
        @Query('token') token: string,
        @Body() changePassword: ChangePassword,
    ) {
        return this.authService.changePassword(token, changePassword.password);
    }
}

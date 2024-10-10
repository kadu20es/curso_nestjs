import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthForgetDTO } from './dto/auth-forget.dto'
import { AuthResetDTO } from './dto/auth-reset.dto'
import { UsersService } from 'src/users/users.service'
import { CheckTokenException } from 'src/exceptions/checkTokenExeption'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @Post('register')
    async register(@Body() { name, email, password }: CreateUserDto) {
        return this.authService.register({ name, email, password })
    }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        const user = this.authService.login(email, password)
        if (!user) {
            throw new NotFoundException('E-mail ou senha inválidos')
        }
        return user
    }

    @Post('forget')
    async recoverUserAccount(@Body() { email }: AuthForgetDTO) {
        const data = await this.authService.recoverUserAccount(email)

        if (!data) {
            throw new NotFoundException(`Conta de usuário inexistente | ${data}`)

        }
        return data
    }

    @Post('reset')
    async reset(@Body() { token, password }: AuthResetDTO) {
        return this.authService.reset(password, token)
    }

    @Post('me')
    async me(@Body() body) {
        let data = null
        try {
            data = await this.authService.checkToken(body.token)
        } catch (error) {
            if (error instanceof CheckTokenException) {
                throw new BadRequestException(error.message);
            }
        }
        return data
    }
}

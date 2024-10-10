import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/database/prisma.service'
import { users as User } from '@prisma/client'
import { AuthRegisterDTO } from './dto/auth-register.dto'
import { UsersService } from 'src/users/users.service'
import { CheckTokenException } from 'src/exceptions/checkTokenExeption'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UsersService
    ) {}

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, {
                expiresIn: '7 days',
                subject: String(user.id),
                issuer: 'Gogus NestJS',
                audience: 'users',
            })
        }
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data)
        return this.createToken(user)
    }

    async checkToken(token: string) {
        let result = null
        try {
                result = this.jwtService.verify(token, {
                issuer: 'Gogus NestJS',
            })
        } catch (error) {
            throw new CheckTokenException('Token inválido')
        }

        return result
    }

    async login(email: string, password: string) {
        const user = await this.prisma.users.findFirst({
            where: {
                email,
                password,
            },
        })

        return this.createToken(user)
    }

    async recoverUserAccount(email: string) {

        const user = await this.prisma.users.findFirst({
            where: { email },
        })

        if (user === null) {
            return false
        }

        const token = {
            recoverToken: this.jwtService.sign({
                email: email,
            },
            {
                expiresIn: '30 minutes',
                subject: String(email),
                issuer: 'Gogus NestJS',
                audience: 'users',
            })
        }

        // TODO: enviar e-mail...
        return token
    }

    async reset(password: string, token: string) {
        // TODO: validar o token...
        const id = 0

        const user = await this.prisma.users.update({
            where: { id },
            data: { password },
        })

        return this.createToken(user)
    }

}

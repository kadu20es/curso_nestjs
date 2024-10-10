import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { PrismaModule } from 'src/database/prisma.module'
import { AuthService } from './auth.service'

@Module({
    imports: [
        UsersModule,
        PrismaModule,
        JwtModule.register({
            secret: `u*Vq.C6p@UZ=a%,;gMTR3fXz'Y8v<r&?`,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}

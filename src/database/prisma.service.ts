import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // conecta ao banco de dados
    async onModuleInit() {
        await this.$connect()
    }

    // desconecta do DB ao final do uso
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => await app.close())
    }
}

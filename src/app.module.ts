import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
//import { DatabaseModule } from './database/database.module'
//import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
//import * as Joi from 'joi'
//import { UsersController } from './users/users.controller'
import { ClientesModule } from './clientes/clientes.module'
import { PessoaModule } from './pessoa/pessoa.module'
import { UserIdCheckMiddleware } from './middlewares/user-id-check.middleware'
import { AuthModule } from './auth/auth.module'


@Module({
    imports: [
        /*ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        NODE_ENV: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SSL: Joi.boolean().required(),
      }),
    }),*/
        //DatabaseModule,
        UsersModule,
        PessoaModule,
        ClientesModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'pessoa/:id',
            method: RequestMethod.ALL,
        })
    }
}

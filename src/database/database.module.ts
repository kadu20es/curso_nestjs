import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (ConfigService: ConfigService) => ({
                type: 'mysql',
                host: ConfigService.get('DB_HOST'),
                port: ConfigService.get('DB_PORT'),
                username: ConfigService.get('DB_USERNAME'),
                password: ConfigService.get('DB_PASSWORD'),
                database: ConfigService.get('DB_DATABASE'),
                autoLoadEntities: true,
                synchronize: false,
                ...(ConfigService.get('DB_SSL')
                    ? {
                          ssl: true,
                          extra: {
                              ssl: {
                                  rejectUnauthorized: false,
                              },
                          },
                      }
                    : {}),
            }),
        }),
    ],
})
export class DatabaseModule {}

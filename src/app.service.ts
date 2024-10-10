import { Injectable, Post } from '@nestjs/common'

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!'
    }

    @Post()
    SetHello(): string {
        return 'POST: Começamoooooooooos'
    }
}

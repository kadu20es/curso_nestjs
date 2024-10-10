import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    ParseIntPipe,
    NotFoundException,
    GoneException,
    HttpStatus,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdatePutUserDto } from './dto/update-put-user.dto'
import { UpdatePatchUserDto } from './dto/update-patch-user.dto'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body() data: CreateUserDto) {
        // os dados que serão alterados vêm no body
        return this.userService.create(data)
    }

    @Get()
    async list() {
        return await this.userService.list()
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        if (await this.userService.exists(id)) {
            return this.userService.findOne(id)
        }
        throw new NotFoundException('O id digitao não existe.')
    }

    @Put(':id') // aqui é necessário colocar o tipo no body usando o DTO adequado (put)
    async update(
        @Body() body: UpdatePutUserDto,
        @Param('id', ParseIntPipe) id: number
    ) {
        // a id vem como parâmetro
        if (await this.userService.exists(id)) {
            return await this.userService.update(id, body)
        }
        throw new NotFoundException('O id digitado não existe.')
    }

    @Patch(':id') // aqui é necessário colocar o tipo no body usando o DTO adequado (patch)
    async partialUpdate(
        @Body() body: UpdatePatchUserDto,
        @Param('id', ParseIntPipe) id: number
    ) {
        if (await this.userService.exists(id)) {
            return await this.userService.update(id, body)
        }
        throw new NotFoundException('O id digitado não existe.')
    }

    @Delete(':id') // O id é number mas chega como string, por isso, utilizamos o ParseIntPipe para converter
    async delete(@Param('id', ParseIntPipe) id: number) {
        if (await this.userService.exists(id)) {
            await this.userService.delete(id)
            return 'Perfil removido'
        }
        throw new NotFoundException('O id digitado não existe.')
    }
}

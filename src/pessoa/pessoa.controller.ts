import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common'
import { CreatePessoaDTO } from './dto/create-pessoa.dto'
import { PessoaService } from './pessoa.service'
import { UpdatePutPessoaDTO } from './dto/update-put-pessoa.dto'
import { UpdatePatchPessoaDTO } from './dto/update-patch-pessoa.dto'
import { LogInterceptor } from 'src/interceptors/log.interceptor'
import { ApiResponse } from '@nestjs/swagger'
import { ParamId } from 'src/decorators/param-id.decorator'

@Controller('pessoa')
export class PessoaController {
    constructor(private readonly pessoaService: PessoaService) {}

    @Post()
    async create(@Body() data: CreatePessoaDTO) {
        return this.pessoaService.create(data)
    }

    @Get()
    async list() {
        return this.pessoaService.list()
    }

    @Get(':id')
    //async findOne(@Param('id', ParseIntPipe) id: number){
    async findOne(@ParamId() id: number) {
        if (await this.pessoaService.exists(id)) {
            return this.pessoaService.findOne(+id)
        }
        throw new NotFoundException('Perfil não encontrado')
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        if (await this.pessoaService.exists(id)) {
            return this.pessoaService.delete(id)
        }
        throw new NotFoundException('Perfil não encontrado')
    }

    @Put(':id')
    async update(
        @Body() data: UpdatePutPessoaDTO,
        @Param('id', ParseIntPipe) id: number
    ) {
        if (await this.pessoaService.exists(id)) {
            return this.pessoaService.update(id, data)
        }
        throw new NotFoundException('Perfil não encontrado')
    }

    @Patch(':id')
    async updatePartial(
        @Body() data: UpdatePatchPessoaDTO,
        @Param('id', ParseIntPipe) id: number
    ) {
        if (await this.pessoaService.exists(id)) {
            return this.pessoaService.update(id, data)
        }
        throw new NotFoundException('Perfil não encontrado')
    }
}

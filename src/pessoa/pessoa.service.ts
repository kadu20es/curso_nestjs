import { PrismaService } from 'src/database/prisma.service'
import { CreatePessoaDTO } from './dto/create-pessoa.dto'
import { Injectable } from '@nestjs/common'
import { UpdatePutPessoaDTO } from './dto/update-put-pessoa.dto'
import { UpdatePatchPessoaDTO } from './dto/update-patch-pessoa.dto'

@Injectable()
export class PessoaService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePessoaDTO) {
        const pessoa = await this.prisma.pessoa.create({
            data: {
                nome: data.nome,
                email: data.email,
                cpf: data.cpf,
                dtnasc: data.dtnasc,
            },
        })

        return pessoa
    }

    async findOne(id: number) {
        return await this.prisma.pessoa.findUnique({
            where: { id },
        })
    }

    async list() {
        return await this.prisma.pessoa.findMany()

        /* é possãvel filtrar, por exemplo, trazer todas as pessoas com nome começando com "car"
            exemplo:
            ...findMany({ where: { nome: { contains: 'car' } } })
        */
    }

    async update(id: number, data: UpdatePutPessoaDTO | UpdatePatchPessoaDTO) {
        return await this.prisma.pessoa.update({
            data,
            where: { id },
        })
    }

    async delete(id: number) {
        return await this.prisma.pessoa.delete({
            where: { id },
        })
    }

    async exists(id: number) {
        // verifica se a entidade existe no DB utilizando cache
        return !!(await this.prisma.pessoa.count({
            where: { id },
        }))
    }
}

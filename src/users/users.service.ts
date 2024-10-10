import { PrismaService } from 'src/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdatePutUserDto } from './dto/update-put-user.dto'
import { UpdatePatchUserDto } from './dto/update-patch-user.dto'

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        /* quando await e return estão na mesma linha, o await pode ser ignorado */
        const user = await this.prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        })
        return user
    }

    async findOne(id: number) {
        return await this.prisma.users.findUnique({
            where: { id },
        })
    }

    async list() {
        return await this.prisma.users.findMany()
    }

    async update(id: number, data: UpdatePutUserDto | UpdatePatchUserDto) {
        return await this.prisma.users.update({
            data,
            where: { id },
        })
    }

    async delete(id: number) {
        return await this.prisma.users.delete({
            where: { id },
        })
    }

    async exists(id: number) {
        return !!(await this.prisma.users.count({
            where: { id },
        }))
    }
}

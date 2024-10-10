import { Type } from 'class-transformer'
import { IsDate, IsEmail, IsString, MinLength } from 'class-validator'

export class CreatePessoaDTO {
    @IsString()
    @MinLength(10)
    nome: string

    @IsEmail()
    email: string

    @IsString()
    cpf: string

    @Type(() => Date)
    @IsDate()
    dtnasc: Date
}

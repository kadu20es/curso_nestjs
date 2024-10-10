import {
    IsEmail,
    IsString,
    IsStrongPassword,
    Min,
    MinLength,
} from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MinLength(6)
    name: string

    @IsEmail()
    email: string

    @IsString()
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
    })
    password: string
}

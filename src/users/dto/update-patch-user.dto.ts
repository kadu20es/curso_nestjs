import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

// reaproveita o CreateUserData
export class UpdatePatchUserDto extends PartialType(CreateUserDto) {}

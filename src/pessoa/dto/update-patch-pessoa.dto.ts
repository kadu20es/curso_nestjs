import { PartialType } from '@nestjs/mapped-types'
import { CreatePessoaDTO } from './create-pessoa.dto'

// reaproveita o CreatePessoaDTO
export class UpdatePatchPessoaDTO extends PartialType(CreatePessoaDTO) {}

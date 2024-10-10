import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
// import { Exclude } from 'class-transformer'

@Entity('pessoa')
export class Pessoa {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'varchar', length: 120 })
    nome: string

    @Column({ type: 'varchar', length: 60 })
    email: string

    @Column({ type: 'bigint' })
    cpf: number

    @Column({ type: 'date' })
    dtNasc: Date

    /* Exemplo para o caso de ter senha

    @Exclude() // usado para excluir dos dados que são retornados em consultas ao backend para o usuário
    @Column({ type: 'varchar', length: 8 })
    password: string

    */

    // usado quando se deseja excluir algum dado no retorno das consultas ao BD utilizando class-transformer
    constructor(partial: Partial<Pessoa>) {
        Object.assign(this, partial)
    }
}

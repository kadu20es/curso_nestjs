import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'varchar', length: 100 })
    name: string

    @Column({ type: 'varchar', length: 60 })
    email: string

    @Exclude() // usado para excluir dos dados que são retornados em consultas ao backend para o usuário
    @Column({ type: 'varchar', length: 8 })
    password: string

    @CreateDateColumn()
    bornIn: Date

    // Para as propriedades excluãdas utilizando class-transformer
    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
}

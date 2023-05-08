import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class StaticLogin {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    secret!: string

    @Column({ nullable: true })
    tokenId!: number
}

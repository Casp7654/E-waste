import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserLogin {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    email!: string

    @Column({ nullable: true })
    password!: string

    @Column({ nullable: true })
    userId!: number
}

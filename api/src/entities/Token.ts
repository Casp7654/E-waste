import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    hash!: string
}

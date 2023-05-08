import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Placement {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    title!: string

}

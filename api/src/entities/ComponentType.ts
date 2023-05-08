import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ComponentType {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    title!: string

}

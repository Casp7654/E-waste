import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ComponentModel {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    title!: string

    @Column({ nullable: true })
    placementId!: number

    @Column({ nullable: true })
    typeId!: number
}

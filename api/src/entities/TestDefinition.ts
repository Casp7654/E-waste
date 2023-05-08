import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class TestDefinition {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    title!: string

    @Column({ nullable: true })
    modelId!: number

    @Column({ nullable: true })
    requiredScore!: number

    @Column({ nullable: true })
    marginValue!: number

}

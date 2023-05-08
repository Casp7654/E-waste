import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class RepurposeValue {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    modelId!: number

    @Column({ nullable: true })
    value!: string

}

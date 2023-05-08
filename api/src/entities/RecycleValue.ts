import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class RecycleValue {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    materialId!: number

    @Column({ nullable: true })
    modelId!: number

    @Column({ nullable: true })
    weight!: string

}

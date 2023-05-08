import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ComponentUnit {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    modelId!: number

    @Column({ nullable: true })
    placementId!: number

    @Column({ nullable: true })
    guid!: string

    @Column({ nullable: true })
    weight!: string

}

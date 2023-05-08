import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class RecycleMaterial {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    title!: string

    @Column({ nullable: true })
    weightValue!: string

}

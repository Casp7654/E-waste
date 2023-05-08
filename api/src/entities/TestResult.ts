import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class TestResult {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    testId!: number

    @Column({ nullable: true })
    unitId!: number

    @Column({ nullable: true })
    score!: number

    @Column({ nullable: true })
    pass!: boolean

}

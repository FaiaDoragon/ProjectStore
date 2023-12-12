import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Products {

    @PrimaryColumn()
    id!: string 

    @Column()
    name!: string 

    @Column()
    category!: string 

    @Column({type: "float"})
    price!: number

    @Column()
    currency!: string 

    @Column()
    stock!: number
    
    @Column({ type: "boolean", default: true})
    status!: boolean

    @Column()
    description!: string 

    @Column()
    image!: string

    @Column()
    createdBy!: string

    @Column()
    updatedby!: string
    
    @CreateDateColumn()
    createAt: Date = new Date()
    
    @UpdateDateColumn()
    updateAt: Date = new Date()
}
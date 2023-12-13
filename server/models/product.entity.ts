import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Product extends BaseEntity {

    @PrimaryColumn({ unique : true})
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
    
    @CreateDateColumn()
    createdAt: Date = new Date()
    
    @UpdateDateColumn()
    updatedAt: Date = new Date()

    // campos de relacion

    @ManyToOne(() => User, user => user.createdProducts)
    createdBy!: User;

    @ManyToOne(() => User, user => user.updatedProducts)
    updatedBy!: User;
}
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Product extends BaseEntity {

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
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt!: Date 
    
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateAt!: Date

    // campos de relacion

    @ManyToOne(() => User, user => user.createdProducts)
    createdBy!: User;

    @ManyToOne(() => User, user => user.updatedProducts)
    updatedBy!: User;
}
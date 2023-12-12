import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

//Entity to use on dbconnection for Products
@Entity()
export class User extends BaseEntity {

    @PrimaryColumn()
    id!: string 

    @Column({ unique : true })
    name!: string 

    @Column()
    lastname!: string
    
    @Column({ unique: true })
    correo!: string
    
    @Column()
    password!: string
    
    @Column({ type: "boolean", default: true})
    status!: boolean 
    
    @Column()
    Rol!: boolean

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt!: Date
    
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateAt!: Date

    //campos de relacion

    @OneToMany(() => Product, product => product.createdBy)
    createdProducts!: Product[];

    @OneToMany(() => Product, product => product.updatedBy)
    updatedProducts!: Product[];
}

//Entity to use on dbconnection for Products

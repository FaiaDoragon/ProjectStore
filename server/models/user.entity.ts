import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

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
    
    @CreateDateColumn()
    createAt: Date = new Date()
    
    @UpdateDateColumn()
    updateAt: Date = new Date()
}

//Entity to use on dbconnection for Products
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
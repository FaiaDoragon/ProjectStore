import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

//Entity to use on dbconnection for Products
@Entity()
export class User extends BaseEntity {

    @PrimaryColumn()
    id: string = ''

    @Column({ unique : true })
    name: string = ''

    @Column()
    lastname: string = ''
    
    @Column({ unique: true })
    correo : string = ''
    
    @Column()
    password: string = ''
    
    @Column({ type: "boolean", default: true})
    status: boolean = true
    
    @Column()
    Rol: boolean = true
    
    @CreateDateColumn()
    createAt: Date = new Date()
    
    @UpdateDateColumn()
    updateAt: Date = new Date()
}

//Entity to use on dbconnection for Products
@Entity()
export class Products {

    @PrimaryColumn()
    id: string = ''

    @Column()
    name: string = ''

    @Column()
    category: string = ''

    @Column({type: "float"})
    price: number = 0

    @Column()
    currency : string = ''

    @Column()
    stock: number = 0
    
    @Column({ type: "boolean", default: true})
    status: boolean = true

    @Column()
    description: string = 'true'

    @Column()
    image: string = 'true'

    @Column()
    createdBy: string = ''

    @Column()
    updatedby: string = ''
    
    @CreateDateColumn()
    createAt: Date = new Date()
    
    @UpdateDateColumn()
    updateAt: Date = new Date()
}
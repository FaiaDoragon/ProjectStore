import { DataSource } from "typeorm"
import "reflect-metadata"
import { User } from "../models/user.entity"
import { Products } from "../models/product.entity"

export const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "ProjectStore",
    database: "ProjectStore",
    synchronize: true,
    entities: [User, Products],
})
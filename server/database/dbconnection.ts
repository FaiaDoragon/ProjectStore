import { DataSource } from "typeorm"
import "reflect-metadata"
import { Products, User } from "../models/entities"

export const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123123",
    database: "test",
    synchronize: true,
    entities: [User, Products],
})
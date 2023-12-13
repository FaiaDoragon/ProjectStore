import { DataSource } from "typeorm"
import "reflect-metadata"
import { envs } from "../helpers"
import { Product, User } from "../models"

export const db = new DataSource({
    type: "mysql",
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASS,
    database: envs.DB_NAME,
    synchronize: true,
    entities: [User, Product],
})

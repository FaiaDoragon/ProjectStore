import { DataSource } from "typeorm"
import "reflect-metadata"
import { Products, User } from "../models/entities"
import { envs } from "../helpers/envs"

export const db = new DataSource({
    type: "mysql",
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASS,
    database: envs.DB_NAME,
    synchronize: true,
    entities: [User, Products],
})

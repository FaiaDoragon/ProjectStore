import { DataSource } from "typeorm"

export const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "test",
    database: "test",
    synchronize: true,
    entities: [Users, Products],
})
import express, { Application } from "express";
import cors from "cors";
import env from 'env-var'
import 'dotenv/config'
import { db } from "../database/dbconnection";
import products from "../routes/produts.route";

export class Server {
    private app : Application;
    private port : number;
    private path = {
        auth: "/auth",
        user: "/user",
        products: "/products"
    }
    constructor() {
        this.app = express()
        this.port = env.get('PORT').required().asPortNumber()

        this.middlewares()

        this.dataBase()

        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    async dataBase() {
        try {
            await db.initialize()
            console.log(`Data Base Inicialized`);
        } catch (error) {
            console.error(`Data Base not inicialized`, error)
        }
    }

    routes() {
        this.app.use(this.path.products, products)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        })
    }
}
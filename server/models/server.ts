import express, { Application } from "express";
import cors from "cors";
import 'dotenv/config'
import { db } from "../database/dbconnection";
import { envs } from "../helpers";
import authRoutes from '../routes/auth.routes'

export class Server {
    private app : Application;
    private port : number;
    constructor() {
        this.app = express()
        this.port = envs.PORT

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
       this.app.use('/api/auth', authRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        })
    }
}

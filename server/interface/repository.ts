import { Request, Response } from 'express';


export interface Repository<T> {
    getAll(res: Response) : Promise<T>
    create(req : Request, res : Response) : Promise<T>
    getOne(req : Request, res : Response) : Promise<T>
    update(req : Request, res : Response) : Promise<T>
    delete(req : Request, res : Response) : Promise<T>
}
import { ProductService } from "../service/products.service";
import { Request, Response } from 'express';

export class Products {
    private service: ProductService;

    constructor() {
        this.service = new ProductService();
    }
    
    async getAll( res : Response) {
        this.service.findAll(res)
    }

    async post( req:Request, res: Response){
        this.service.create(req, res)
    }

    async getOne() {}
    
    async put(){}

    async delete(){}
}
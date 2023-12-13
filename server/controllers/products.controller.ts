import { ProductService } from "../service/products.service";
import { Request, Response } from 'express';

export class Products {
    private service: ProductService;

    constructor() {
        this.service = new ProductService();
    }
    
    async getAll( res : Response ) {
        this.service.findAll(res)
    }

    async post( req:Request, res: Response ){
        this.service.create(req, res)
    }

    async getOneById( req:Request, res: Response ) {}

    async getAllByCategory( req:Request, res: Response ) {}

    async put( req:Request, res: Response ){}

    async delete( req:Request, res: Response ){}
}
import { ProductService } from "../service/products.service";
import { Request, Response } from 'express';

export class Products {
    private service: ProductService;

    constructor() {
        this.service = new ProductService();
    }
    
    async getAllProducts( res : Response ) {
        this.service.findAll(res)
    }

    async createProduct( req:Request, res: Response ){
        this.service.create(req, res)
    }

    async getOneProductById( req:Request, res: Response ) {

    }

    async getAllByCategory( req:Request, res: Response ) {

    }

    async updateProduct( req:Request, res: Response ){

    }

    async deleteProduct( req:Request, res: Response ){
        
    }
}
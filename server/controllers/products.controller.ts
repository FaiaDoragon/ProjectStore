import { ProductService } from "../service/products.service";
import { Request, Response } from 'express';

export class Products {
    private service: ProductService;

    constructor() {
        this.service = new ProductService();
    }
    
    async getProducts( res : Response ) {
        this.service.findAll(res)
    }

    async createProduct( req:Request, res: Response ){
        this.service.create(req, res)
    }

    async getProductById( req:Request, res: Response ) {
        this.service.findById(req, res)
    }

    async getProductsByCategory( req:Request, res: Response ) {
        this.service.findByCategory(req, res)
    }

    async productUpdate( req:Request, res: Response ){
        this.service.update(req, res)
    }

    async deleteProduct( req:Request, res: Response ){
        this.service.delete(req, res)
    }
}
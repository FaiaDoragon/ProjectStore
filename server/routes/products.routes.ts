import { Request, Response, Router } from "express";
import { Products } from "../controllers/products.controller";


const router = Router();

router.get('/', 
(req, res: Response) => new Products().getAllProducts(res) );

router.get('/:id', 
(req : Request, res: Response) => new Products().getOneProductById(req, res));

router.get('/category/:category', 
(req : Request, res: Response) => new Products().getAllByCategory(req, res));

router.post('/', 
(req : Request, res: Response) => new Products().createProduct(req, res) );

router.put('/:id', 
(req : Request, res: Response) => new Products().updateProduct(req, res));

router.delete('/:id', 
(req : Request, res: Response) => new Products().deleteProduct(req, res));

export default router

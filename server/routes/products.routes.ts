import { Request, Response, Router } from "express";
import { Products } from "../controllers/products.controller";


const router = Router();

router.get('/', 
(res: Response) => new Products().getAll(res) );

router.get('/:id', 
(req : Request, res: Response) => new Products().getOneById(req, res));

router.get('/category/:category', 
(req : Request, res: Response) => new Products().getAllByCategory(req, res));

router.post('/', 
(req : Request, res: Response) => new Products().post(req, res) );

router.put('/:id', 
(req : Request, res: Response) => new Products().put(req, res));

router.delete('/:id', 
(req : Request, res: Response) => new Products().delete(req, res));

export default router

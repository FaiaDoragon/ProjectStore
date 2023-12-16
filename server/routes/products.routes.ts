import { Request, Response, Router } from "express";
import { Products } from "../controllers/products.controller";
import { middleware, validRol } from "./users.routes";


const router = Router();

router.get('/', middleware.validToken, validRol.isUserAdmin,
(req, res: Response) => new Products().getProducts(res));

router.get('/:id', middleware.validToken, validRol.isUserAdmin,
(req : Request, res: Response) => new Products().getProductById(req, res));

router.get('/category/:category', middleware.validToken, validRol.isUserAdmin,
(req : Request, res: Response) => new Products().getProductsByCategory(req, res));

router.post('/', middleware.validToken, validRol.isUserAdmin,
(req : Request, res: Response) => new Products().createProduct(req, res) );

router.put('/:id', middleware.validToken, validRol.isUserAdmin,
(req : Request, res: Response) => new Products().productUpdate(req, res));

router.delete('/:id', middleware.validToken, validRol.isUserAdmin,
(req : Request, res: Response) => new Products().deleteProduct(req, res));

export default router

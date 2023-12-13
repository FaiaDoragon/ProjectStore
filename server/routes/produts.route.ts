import { Request, Response, Router } from "express";
import { Products } from "../controllers/products.controller";


const router = Router();

router.get('/', (req : Request, res: Response) => new Products().getAll(res) )
router.post('/', (req : Request, res: Response) => new Products().post(req, res) )
router.get('/:id')
router.get('/:category')
router.put('/:id')
router.delete('/:id')

export default router

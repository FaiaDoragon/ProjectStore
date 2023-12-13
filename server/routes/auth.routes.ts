import { Router } from "express";
import { check } from "express-validator";
import { AuthController } from "../controllers/auth.controllers";
import { AuthService } from "../services/auth.services";
import { JwtAdapter, envs } from "../helpers";
import { validFields } from "../middleware/valid-fields.middleware";


const router = Router();
const jwtAdapter = new JwtAdapter(envs.JWT_SEED); 
const service = new AuthService(jwtAdapter);
const controller = new AuthController(service);

// Se coloca varias veces el middleware "validFields" para que limpie
// el error anterior y lanza en nuevo
router.post('/login',[
   check('correo', 'Invalid email').isEmail(),
   validFields,
   check('password', 'Invalid password').not().isEmpty(),
   validFields
],controller.login)

router.post('/register',[
   check('name', 'Invalid name').not().isEmpty(),
   validFields,
   check('correo', 'Invalid email').isEmail(),
   validFields,
   check('password', 'Invalid password').not().isEmpty(),
   validFields,
   check('lastname', 'Invalid lastname').not().isEmpty(),
   validFields,
   check('rol', 'Invalid rol').isBoolean(),
   validFields
],controller.register)

export default router;

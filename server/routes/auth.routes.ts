import { Router } from "express";
import { check } from "express-validator";
import { AuthController } from "../controllers/auth.controllers";
import { AuthService } from "../services/auth.service";
import { DbValidators, JwtAdapter, envs } from "../helpers";
import { validFields } from "../middleware";


const router = Router();
const jwtAdapter = new JwtAdapter(envs.JWT_SEED); 
const service = new AuthService(jwtAdapter);
const controller = new AuthController(service);

const dbValidators = new DbValidators()
// Se coloca varias veces el middleware "validFields" para que limpie
// el error anterior y lanza en nuevo
router.post('/login',[
   check('correo', 'Inavalid email').isEmail(),
   validFields,
   check('password', 'Missing password').not().isEmpty(),
   validFields,
],controller.login)

router.post('/register',[
   check('name', 'Missing name').not().isEmpty(),
   validFields,
   check('correo', 'Missing email').isEmail(),
   validFields,
   check('correo').custom(dbValidators.validExistEmail),
   validFields,
   check('password', 'Missing password').not().isEmpty(),
   validFields,
   check('lastname', 'Missing lastname').not().isEmpty(),
   validFields,
   check('rol', 'Missing rol').isBoolean(),
   validFields
],controller.register)

export default router;

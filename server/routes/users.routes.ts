import { Router } from "express";
import { check } from "express-validator";
import { UserService } from "../services/users.service";
import { UserController } from "../controllers/users.controllers";
import { JwtAdapter, envs, DbValidators } from "../helpers";
import { AuthMiddleware, ValidRol, validFields } from "../middleware";
import { db } from "../database/dbconnection";


const router = Router();
const service = new UserService(db);
const controller = new UserController(service);

const jwtadapter = new JwtAdapter(envs.JWT_SEED);
const dbValidators = new DbValidators();
const validRol = new ValidRol();
const middleware = new AuthMiddleware(jwtadapter);

router.get('/',[
   middleware.validToken,
   validRol.isUserAdmin, // Verifica que el usuario sea admin
],controller.getUsers);

router.get('/deleted',[
   middleware.validToken,
   validRol.isUserAdmin, // Verifica que el usuario sea admin
],controller.getDeletedUsers);

//TODO: middleware validar que exista el usuario
router.put('/:id',[
   middleware.validToken,
   check('id', 'Invalid id').not().isEmpty(),
   validFields,
   check('id').custom(dbValidators.isUserOwner),
   check('id').custom(dbValidators.validExistUser),
   validFields,
],controller.userUpdate);

//TODO: middleware validar que exista el usuario
router.delete('/:id',[
   middleware.validToken,
   validRol.isUserAdmin,
   check('id', 'Invalid id').not().isEmpty(),
   validFields,
   check('id').custom(dbValidators.validExistUser),
   validFields,
],controller.deleteUser);

export default router;

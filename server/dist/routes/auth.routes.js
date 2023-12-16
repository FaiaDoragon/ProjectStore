"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_service_1 = require("../services/auth.service");
const helpers_1 = require("../helpers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
const jwtAdapter = new helpers_1.JwtAdapter(helpers_1.envs.JWT_SEED);
const service = new auth_service_1.AuthService(jwtAdapter);
const controller = new auth_controllers_1.AuthController(service);
const dbValidators = new helpers_1.DbValidators();
// Se coloca varias veces el middleware "validFields" para que limpie
// el error anterior y lanza en nuevo
router.post('/login', [
    (0, express_validator_1.check)('correo', 'Inavalid email').isEmail(),
    middleware_1.validFields,
    (0, express_validator_1.check)('password', 'Missing password').not().isEmpty(),
    middleware_1.validFields,
], controller.login);
router.post('/register', [
    (0, express_validator_1.check)('name', 'Missing name').not().isEmpty(),
    middleware_1.validFields,
    (0, express_validator_1.check)('correo', 'Missing email').isEmail(),
    middleware_1.validFields,
    (0, express_validator_1.check)('correo').custom(dbValidators.validExistEmail),
    middleware_1.validFields,
    (0, express_validator_1.check)('password', 'Missing password').not().isEmpty(),
    middleware_1.validFields,
    (0, express_validator_1.check)('lastname', 'Missing lastname').not().isEmpty(),
    middleware_1.validFields,
    (0, express_validator_1.check)('rol', 'Missing rol').isBoolean(),
    middleware_1.validFields
], controller.register);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
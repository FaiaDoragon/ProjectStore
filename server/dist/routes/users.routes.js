"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.validRol = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_service_1 = require("../services/users.service");
const users_controllers_1 = require("../controllers/users.controllers");
const helpers_1 = require("../helpers");
const middleware_1 = require("../middleware");
const dbconnection_1 = require("../database/dbconnection");
const router = (0, express_1.Router)();
const service = new users_service_1.UserService(dbconnection_1.db);
const controller = new users_controllers_1.UserController(service);
const jwtadapter = new helpers_1.JwtAdapter(helpers_1.envs.JWT_SEED);
const dbValidators = new helpers_1.DbValidators();
exports.validRol = new middleware_1.ValidRol();
exports.middleware = new middleware_1.AuthMiddleware(jwtadapter);
router.get('/', [
    exports.middleware.validToken,
    exports.validRol.isUserAdmin, // Verifica que el usuario sea admin
], controller.getUsers);
router.get('/deleted', [
    exports.middleware.validToken,
    exports.validRol.isUserAdmin, // Verifica que el usuario sea admin
], controller.getDeletedUsers);
router.put('/:id', [
    exports.middleware.validToken,
    (0, express_validator_1.check)('id', 'Invalid id').isUUID(),
    middleware_1.validFields,
    (0, express_validator_1.check)('id').custom(dbValidators.isUserOwner),
    (0, express_validator_1.check)('id').custom(dbValidators.validExistUser),
    middleware_1.validFields,
], controller.userUpdate);
router.delete('/:id', [
    exports.middleware.validToken,
    exports.validRol.isUserAdmin,
    (0, express_validator_1.check)('id', 'Invalid id').isUUID(),
    middleware_1.validFields,
    (0, express_validator_1.check)('id').custom(dbValidators.validExistUser),
    middleware_1.validFields,
], controller.deleteUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map
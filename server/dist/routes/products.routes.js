"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const users_routes_1 = require("./users.routes");
const router = (0, express_1.Router)();
router.get('/', users_routes_1.middleware.validToken, users_routes_1.validRol.isUserAdmin, (req, res) => new products_controller_1.Products().getProducts(res));
router.get('/:id', users_routes_1.middleware.validToken, users_routes_1.validRol.isUserAdmin, (req, res) => new products_controller_1.Products().getProductById(req, res));
router.get('/category/:category', users_routes_1.middleware.validToken, users_routes_1.validRol.isUserAdmin, (req, res) => new products_controller_1.Products().getProductsByCategory(req, res));
router.post('/', users_routes_1.middleware.validToken, users_routes_1.validRol.isUserAdmin, (req, res) => new products_controller_1.Products().createProduct(req, res));
router.put('/:id', users_routes_1.middleware.validToken, users_routes_1.validRol.isUserAdmin, (req, res) => new products_controller_1.Products().productUpdate(req, res));
router.delete('/:id', users_routes_1.middleware.validToken, users_routes_1.validRol.isUserAdmin, (req, res) => new products_controller_1.Products().deleteProduct(req, res));
exports.default = router;
//# sourceMappingURL=products.routes.js.map
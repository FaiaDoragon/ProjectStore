"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const router = (0, express_1.Router)();
router.get('/', (req, res) => new products_controller_1.Products().getProducts(res));
router.get('/:id', (req, res) => new products_controller_1.Products().getProductById(req, res));
router.get('/category/:category', (req, res) => new products_controller_1.Products().getProductsByCategory(req, res));
router.post('/', (req, res) => new products_controller_1.Products().createProduct(req, res));
router.put('/:id', (req, res) => new products_controller_1.Products().productUpdate(req, res));
router.delete('/:id', (req, res) => new products_controller_1.Products().deleteProduct(req, res));
exports.default = router;
//# sourceMappingURL=products.routes.js.map
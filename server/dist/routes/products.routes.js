"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const router = (0, express_1.Router)();
router.get('/', (req, res) => new products_controller_1.Products().getAllProducts(res));
router.get('/:id', (req, res) => new products_controller_1.Products().getOneProductById(req, res));
router.get('/category/:category', (req, res) => new products_controller_1.Products().getAllByCategory(req, res));
router.post('/', (req, res) => new products_controller_1.Products().createProduct(req, res));
router.put('/:id', (req, res) => new products_controller_1.Products().updateProduct(req, res));
router.delete('/:id', (req, res) => new products_controller_1.Products().deleteProduct(req, res));
exports.default = router;
//# sourceMappingURL=products.routes.js.map
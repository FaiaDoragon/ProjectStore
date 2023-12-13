"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const router = (0, express_1.Router)();
router.get('/', (req, res) => new products_controller_1.Products().getAll(res));
router.post('/', (req, res) => new products_controller_1.Products().post(req, res));
router.get('/:id');
router.get('/:category');
router.put('/:id');
router.delete('/:id');
exports.default = router;
//# sourceMappingURL=produts.route.js.map
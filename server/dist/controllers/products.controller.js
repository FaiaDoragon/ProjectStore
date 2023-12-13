"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const products_service_1 = require("../service/products.service");
class Products {
    constructor() {
        this.service = new products_service_1.ProductService();
    }
    getAllProducts(res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.findAll(res);
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.create(req, res);
        });
    }
    getOneProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.findById(req, res);
        });
    }
    getAllByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.findByCategory(req, res);
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.update(req, res);
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.delete(req, res);
        });
    }
}
exports.Products = Products;
//# sourceMappingURL=products.controller.js.map
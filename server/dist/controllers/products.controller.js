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
    getAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.findAll(res);
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.create(req, res);
        });
    }
    getOne() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    put() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Products = Products;
//# sourceMappingURL=products.controller.js.map
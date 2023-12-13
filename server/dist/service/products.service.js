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
exports.ProductService = void 0;
// import { Product } from "../models/product.entity";
// import { Repository } from '../interface/repository';
const products_repository_1 = require("../interface/products.repository");
class ProductService {
    constructor() {
        this.repository = new products_repository_1.MysqlRepository();
    }
    findAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.getAll(res);
                return response;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.create(req, res);
                return response;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map
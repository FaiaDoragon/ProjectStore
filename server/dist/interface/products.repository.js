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
exports.MysqlRepository = void 0;
// import { Repository } from "./repository";
const dbconnection_1 = require("../database/dbconnection");
const product_entity_1 = require("../models/product.entity");
const uuid_1 = require("uuid");
class MysqlRepository {
    constructor() {
        this.db = dbconnection_1.db;
    }
    getAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_entity_1.Product.find();
            try {
                if (products.length !== 0) {
                    res.status(200).json({
                        msg: "Lista completa de Productos",
                        products
                    });
                    return;
                }
                res.status(404).json({
                    msg: `No se encontraron productos en la base de datos`
                });
            }
            catch (error) {
                console.error('Error al obtener productos:', error);
                res.status(500).json({
                    msg: "Error al obtener los datos solicitados",
                    error: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, category, stock, price, currency, description, image } = req.body;
            const id = (0, uuid_1.v4)();
            try {
                const products = product_entity_1.Product.create({
                    id,
                    name,
                    category,
                    stock,
                    price,
                    currency,
                    description,
                    image
                });
                yield products.save();
                res.status(201).json({
                    msg: 'Producto creado exitosamente',
                    products
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Comuniquese con el Administrador",
                    error: error.message,
                });
            }
        });
    }
}
exports.MysqlRepository = MysqlRepository;
//# sourceMappingURL=products.repository.js.map
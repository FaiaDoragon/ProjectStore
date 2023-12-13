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
const dbconnection_1 = require("../database/dbconnection");
const product_entity_1 = require("../models/product.entity");
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
            try {
                const products = product_entity_1.Product.create({
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
                    msg: "Error al crear el producto",
                    error: error.message,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const product = yield product_entity_1.Product.findOneBy({
                    id
                });
                if (!product) {
                    res.status(404).json({ msg: `No se encontro producto con el id: ${id}` });
                    return;
                }
                res.status(200).json({
                    msg: "producto encontrado",
                    product
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Error al intengar obtener producto por id",
                    error: error.message,
                });
            }
        });
    }
    getAllByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category } = req.params;
            try {
                const products = yield product_entity_1.Product.findBy({
                    category
                });
                if (!products) {
                    res.status(404).json({ msg: `No se encontraron productos en la categoria: ${category}` });
                    return;
                }
                res.status(200).json({
                    msg: `productos encontrados con la categoria: ${category}`,
                    products
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Error al intengar obtener producto por id",
                    error: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const productoDB = dbconnection_1.db.getRepository(product_entity_1.Product);
            try {
                const product = yield product_entity_1.Product.findOneBy({
                    id
                });
                if (!product) {
                    res.status(404).json({ msg: `No se encontro producto con el id: ${id}` });
                    return;
                }
                if (!product.status) {
                    productoDB.merge(product, { status: true });
                    yield productoDB.save(product);
                    res.status(200).json({
                        msg: "Estado cambiado a true",
                        product
                    });
                    return;
                }
                productoDB.merge(product, { status: false });
                yield productoDB.save(product);
                res.status(200).json({
                    msg: "Estado cambiado a false",
                    product
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Error al intengar obtener producto por id",
                    error: error.message,
                });
            }
        });
    }
}
exports.MysqlRepository = MysqlRepository;
//# sourceMappingURL=products.repository.js.map
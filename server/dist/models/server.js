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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_var_1 = __importDefault(require("env-var"));
require("dotenv/config");
const dbconnection_1 = require("../database/dbconnection");
const produts_route_1 = __importDefault(require("../routes/produts.route"));
class Server {
    constructor() {
        this.path = {
            auth: "/auth",
            user: "/user",
            products: "/products"
        };
        this.app = (0, express_1.default)();
        this.port = env_var_1.default.get('PORT').required().asPortNumber();
        this.middlewares();
        this.dataBase();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    dataBase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbconnection_1.db.initialize();
                console.log(`Data Base Inicialized`);
            }
            catch (error) {
                console.error(`Data Base not inicialized`, error);
            }
        });
    }
    routes() {
        this.app.use(this.path.products, produts_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const user_entity_1 = require("../models/user.entity");
const product_entity_1 = require("../models/product.entity");
exports.db = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "ProjectStore",
    database: "ProjectStore",
    entities: [user_entity_1.User, product_entity_1.Product],
    synchronize: true
});
//# sourceMappingURL=dbconnection.js.map
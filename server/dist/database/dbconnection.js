"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const entities_1 = require("../models/entities");
exports.db = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123123",
    database: "test",
    synchronize: true,
    entities: [entities_1.User, entities_1.Products],
});
//# sourceMappingURL=dbconnection.js.map
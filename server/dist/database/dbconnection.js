"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
exports.db = new typeorm_1.DataSource({
    type: "mysql",
    host: helpers_1.envs.DB_HOST,
    port: helpers_1.envs.DB_PORT,
    username: helpers_1.envs.DB_USER,
    password: helpers_1.envs.DB_PASS,
    database: helpers_1.envs.DB_NAME,
    synchronize: false,
    entities: [models_1.User, models_1.Product],
});
//# sourceMappingURL=dbconnection.js.map
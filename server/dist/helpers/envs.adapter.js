"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const env_var_1 = __importDefault(require("env-var"));
// Lee todas las env y las almacena en el obj
// con su tipo de valor
exports.envs = {
    PORT: env_var_1.default.get('PORT').required().asPortNumber(),
    JWT_SEED: env_var_1.default.get('JWT_SEED').required().asString(),
    DB_NAME: env_var_1.default.get('DB_NAME').required().asString(),
    DB_PASS: env_var_1.default.get('DB_PASS').required().asString(),
    DB_USER: env_var_1.default.get('DB_USER').required().asString(),
    DB_HOST: env_var_1.default.get('DB_HOST').required().asString(),
    DB_PORT: env_var_1.default.get('DB_PORT').required().asPortNumber(),
};
//# sourceMappingURL=envs.adapter.js.map
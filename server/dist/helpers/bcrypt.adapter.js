"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptAdapter {
    static hash(password) {
        const salt = bcrypt_1.default.genSaltSync();
        return bcrypt_1.default.hashSync(password, salt);
    }
    static compare(password, hash) {
        return bcrypt_1.default.compareSync(password, hash);
    }
}
exports.BcryptAdapter = BcryptAdapter;
//# sourceMappingURL=bcrypt.adapter.js.map
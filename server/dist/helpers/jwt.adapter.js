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
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtAdapter {
    constructor(// Injección de dependencias
    jwtSeed) {
        this.jwtSeed = jwtSeed;
    }
    generateToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                jsonwebtoken_1.default.sign(payload, this.jwtSeed, { expiresIn: '6h' }, (error, token) => {
                    if (error)
                        resolve(null);
                    resolve(token);
                });
            });
        });
    }
    validToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                jsonwebtoken_1.default.verify(token, this.jwtSeed, (error, decode) => {
                    if (error)
                        resolve(null);
                    resolve(decode);
                });
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
//# sourceMappingURL=jwt.adapter.js.map
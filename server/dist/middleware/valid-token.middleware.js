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
exports.AuthMiddleware = void 0;
const dbconnection_1 = require("../database/dbconnection");
const models_1 = require("../models");
class AuthMiddleware {
    constructor(jwtAdapter) {
        this.jwtAdapter = jwtAdapter;
        this.validToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = req.header('Authorization');
                if (!auth)
                    return res.status(401).json({ error: 'Missing token' });
                // Verifica que sea un Beare token
                if (!auth.startsWith('Bearer '))
                    return res.status(401).json({ error: 'Invalid Beare token' });
                const token = auth.split(' ').at(1) || '';
                const payload = yield this.jwtAdapter.validToken(token);
                if (!payload)
                    return res.status(401).json({ error: 'Invalid token' });
                const user = yield this.getUser(payload.id);
                if (!user || !user.status)
                    return res.status(404).json({ msg: 'User not found' });
                req.body.user = user;
                next();
            }
            catch (error) {
                console.log(error);
                throw 'Internal Server Error';
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield dbconnection_1.db.getRepository(models_1.User).findOneBy({ id });
                return user;
            }
            catch (error) {
                console.log(error);
                throw 'Internal Server Error';
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=valid-token.middleware.js.map
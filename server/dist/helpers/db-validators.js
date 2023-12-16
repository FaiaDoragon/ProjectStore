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
exports.DbValidators = void 0;
const models_1 = require("../models");
class DbValidators {
    constructor() { }
    validExistEmail(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOneBy({ correo });
            if (user)
                throw 'Email already in use';
        });
    }
    validExistUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOneBy({ id });
            if (!user)
                throw `User not exist with id: ${id}`;
        });
    }
    isUserOwner(id) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOneBy({ id });
                if ((user === null || user === void 0 ? void 0 : user.id) !== req.body.user.id)
                    return res.status(401).json({
                        msg: 'User is not the owner of this account'
                    });
                next();
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Internal Server Error' });
            }
        });
    }
}
exports.DbValidators = DbValidators;
//# sourceMappingURL=db-validators.js.map
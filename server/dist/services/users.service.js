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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_entity_1 = require("../models/user.entity");
const helpers_1 = require("../helpers");
class UserService {
    constructor(datasource) {
        this.datasource = datasource;
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userdb = yield this.datasource.getRepository(user_entity_1.User).findOneBy({ id });
            return userdb;
        });
    }
    getUsers(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [total, users] = yield Promise.all([
                    user_entity_1.User.countBy({ status: true }),
                    user_entity_1.User.find({
                        where: {
                            status: true
                        },
                        take: limit,
                        skip: page
                    })
                ]);
                return {
                    next: `/api/users?limit=${limit}&page=${page + 1}`,
                    prev: (page - 1 >= 0) ? `/api/users?limit=${limit}&page=${page - 1}` : null,
                    limit, page,
                    total,
                    users
                };
            }
            catch (error) {
                console.log(error);
                throw 'Internal Server Error';
            }
        });
    }
    getDeletedUsers(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [total, users] = yield Promise.all([
                    user_entity_1.User.countBy({ status: false }),
                    user_entity_1.User.find({
                        where: {
                            status: false
                        },
                        take: limit,
                        skip: page
                    })
                ]);
                return {
                    next: `/api/users?limit=${limit}&page=${page + 1}`,
                    prev: (page - 1 >= 0) ? `/api/users?limit=${limit}&page=${page - 1}` : null,
                    limit, page,
                    total,
                    users
                };
            }
            catch (error) {
                console.log(error);
                throw 'Internal Server Error';
            }
        });
    }
    userUpdate(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updateDto, data = __rest(updateDto, ["id"]);
            try {
                const userDb = yield this.getUserById(id);
                data.password = helpers_1.BcryptAdapter.hash(data.password);
                const dataToUpdate = Object.assign(Object.assign({}, data), { updatedAt: new Date() });
                const user = this.datasource.getRepository(user_entity_1.User).merge(userDb, dataToUpdate);
                yield user.save();
                return user;
            }
            catch (error) {
                console.log(error);
                throw 'Internal Server Error';
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDb = yield this.getUserById(id);
                const user = this.datasource.getRepository(user_entity_1.User).merge(userDb, { status: false });
                yield user.save();
                return user;
            }
            catch (error) {
                console.log(error);
                throw 'Internal Server Error';
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map
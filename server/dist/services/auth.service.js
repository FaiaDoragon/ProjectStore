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
exports.AuthService = void 0;
const dbconnection_1 = require("../database/dbconnection");
const helpers_1 = require("../helpers");
const user_entity_1 = require("../models/user.entity");
class AuthService {
    constructor(jwtAdapter) {
        this.jwtAdapter = jwtAdapter;
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Busca el usuario en db por el correo
                const user = yield dbconnection_1.db.getRepository(user_entity_1.User).findOneBy({
                    correo: loginDto.correo
                });
                const isSamePassword = helpers_1.BcryptAdapter.compare(loginDto.password, user === null || user === void 0 ? void 0 : user.password);
                if (!isSamePassword)
                    throw 'Password or Email incorrect';
                // Se crea el token
                const token = yield this.jwtAdapter.generateToken({
                    rol: user === null || user === void 0 ? void 0 : user.Rol,
                    id: user === null || user === void 0 ? void 0 : user.id,
                    status: user === null || user === void 0 ? void 0 : user.status
                });
                return {
                    user,
                    token
                };
            }
            catch (error) {
                // Verifica que el error no sea un error del sistema y arroja el custom error
                //TODO: mejorar el manejo de este error
                if (error instanceof Error) {
                    // Si es una excepción se inprime el error y arroja un custom error
                    console.log(error);
                    throw 'Internal Server Error';
                }
                throw { type: 'bad request', error };
            }
        });
    }
    register(registerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rol } = registerDto, data = __rest(registerDto, ["rol"]);
            try {
                // Se asignan las propiedades para el usuario que
                // se va a crear
                data.password = helpers_1.BcryptAdapter.hash(data.password);
                const newUser = user_entity_1.User.create(Object.assign(Object.assign({}, data), { Rol: rol }));
                // Crea el JWT
                const token = yield this.jwtAdapter.generateToken({
                    rol: newUser.Rol,
                    id: newUser.id,
                    status: newUser.status
                });
                // Guarda el nuevo usuario en la db
                yield newUser.save();
                return {
                    user: newUser,
                    token
                };
            }
            catch (error) {
                console.log(error);
                throw 'Internal Server Error';
            }
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
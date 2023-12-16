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
exports.AuthController = void 0;
class AuthController {
    constructor(//Injección de dependencias
    authService) {
        this.authService = authService;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            try {
                const { user, token } = yield this.authService.login({ correo, password });
                res.cookie('token', token);
                res.json({ user });
            }
            catch (error) {
                //TODO: mejorar el manejo de este error
                if (error.type === 'bad request')
                    return res.status(404).json({ error: error.error });
                res.status(500).json({ error });
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, correo, password, rol, lastname } = req.body;
            this.authService.register({ name, correo, password, rol, lastname })
                .then(({ user, token }) => {
                res.cookie('token', token);
                res.status(201).json({ user });
            })
                .catch(error => res.status(500).json({ error }));
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controllers.js.map
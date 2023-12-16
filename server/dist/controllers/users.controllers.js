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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 0 } = req.query;
            const pageToNumber = Number(page);
            const limitToNumber = Number(limit);
            this.userService.getUsers(limitToNumber, pageToNumber)
                .then(resp => res.json(resp))
                .catch(error => res.status(500).json({ error }));
        });
        this.getDeletedUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 0 } = req.query;
            const pageToNumber = Number(page);
            const limitToNumber = Number(limit);
            this.userService.getDeletedUsers(limitToNumber, pageToNumber)
                .then(resp => res.json(resp))
                .catch(error => res.status(500).json({ error }));
        });
        this.userUpdate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, password } = req.body;
            const { id } = req.params;
            this.userService.userUpdate({ id, name, lastname, password })
                .then(resp => res.json(resp))
                .catch(error => res.status(500).json({ error }));
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            this.userService.deleteUser(id)
                .then(resp => res.json(resp))
                .catch(error => res.status(500).json({ error }));
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=users.controllers.js.map
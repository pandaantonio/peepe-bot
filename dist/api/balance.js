"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
;
class BalanceAPI {
    apiURL;
    constructor() {
        this.apiURL = `${process.env.WEBSITE}/api/users/`;
    }
    async getData(id) {
        return await axios_1.default.get(`${this.apiURL}${id}`)
            .then((res) => res.data)
            .catch(() => undefined);
    }
}
exports.default = BalanceAPI;
;

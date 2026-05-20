"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const axios_1 = __importDefault(require("axios"));
async function default_1(id) {
    return await axios_1.default
        .get(`https://discord.com/api/v10/applications/${id}/rpc`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    })
        .then((res) => res.data)
        .catch((err) => {
        console.log(err);
        return undefined;
    });
}

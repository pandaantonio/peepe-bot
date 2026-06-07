"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const UserOption_1 = __importDefault(require("@/options/UserOption"));
const command = {
    type: 1,
    name: 'member',
    nameLocalizations: {
        "pt-BR": "membro"
    },
    description: "Null",
    dmPermission: false,
    options: [{
            type: 1,
            name: "avatar",
            description: "See a user avatar.",
            descriptionLocalizations: {
                "pt-BR": "Veja o avatar do usuário."
            },
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "banner",
            nameLocalizations: {
                "pt-BR": "estandarte"
            },
            description: "See a user banner.",
            descriptionLocalizations: {
                "pt-BR": "Veja o estandarte do usuário."
            },
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }],
};
exports.default = command;

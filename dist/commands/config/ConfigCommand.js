"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default().setCommand({
    type: 1,
    name: "config",
    description: "Configure recursos do servidor.",
    options: [{
            type: 1,
            name: "autorole",
            description: "Configure o cargo automático para novos membros.",
        }],
    dmPermission: false,
    defaultMemberPermissions: "268435488",
});

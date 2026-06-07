"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default().setCommand({
    type: 1,
    name: "config",
    description: "Configurações do servidor",
    dmPermission: false,
    defaultMemberPermissions: "32",
    options: [
        {
            type: 1,
            name: "anti-invite",
            description: "Configure o bloqueio de convites",
            options: [
                {
                    type: 5, // Boolean
                    name: "enabled",
                    description: "Ativar ou desativar o sistema",
                    required: true
                }
            ]
        }
    ]
});

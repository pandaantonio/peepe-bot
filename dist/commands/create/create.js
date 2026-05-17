"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
const create_embed_1 = __importDefault(require("./create-embed"));
exports.default = new command_1.default().setCommand({
    name: "create",
    description: "Null",
    options: [
        create_embed_1.default.subcommand,
    ],
    dmPermission: false,
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const GetEmoji_1 = __importDefault(require("@/utils/GetEmoji"));
const handler_1 = __importDefault(require("@/struct/handler"));
class App extends oceanic_js_1.Client {
    modals;
    commands;
    components;
    contexts = new Map();
    constructor() {
        super({
            gateway: {
                intents: [
                    "GUILDS",
                    "GUILD_MEMBERS",
                    "GUILD_MESSAGES",
                    "MESSAGE_CONTENT",
                ],
                autoReconnect: true,
            },
            defaultImageSize: 4096,
            auth: process.env.TOKEN,
            defaultImageFormat: "png",
        });
    }
    init() {
        this.once("connect", async () => {
            const handler = new handler_1.default(this);
            await handler.init();
        });
        this.connect();
    }
    async getEmoji(name) {
        const emojis = (await this.application.getEmojis()).items;
        const e = emojis.find((e) => e.name === name);
        const emoji = await (0, GetEmoji_1.default)(`<${e?.animated ? "a" : ""}:${e?.name}:${e?.id}>`);
        return emoji;
    }
    async getEmrl(name) {
        const emoji = await this.getEmoji(name);
        return emoji && emoji.url ? emoji.url : undefined;
    }
    async getButoji(name) {
        const emoji = await this.getEmoji(name);
        return emoji ? {
            name: emoji?.name,
            id: emoji?.id,
        } : undefined;
    }
    async getMenoji(name) {
        const emoji = await this.getEmoji(name);
        return emoji?.mention;
    }
}
exports.default = App;
;

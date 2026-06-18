"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const handler_1 = __importDefault(require("@/struct/handler"));
class App extends oceanic_js_1.Client {
    commands = new Map();
    constructor() {
        super({
            gateway: {
                autoReconnect: true,
            },
            defaultImageSize: 4096,
            auth: process.env.TOKEN,
            defaultImageFormat: "png",
        });
    }
    init() {
        this.connect().then(async () => {
            const handler = new handler_1.default(this);
            await handler.init();
        });
    }
}
exports.default = App;
;

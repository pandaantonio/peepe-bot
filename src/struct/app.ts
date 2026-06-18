import { Client } from "oceanic.js";
import Handler from "@/struct/handler";
import Command from "@/struct/command";

export default class App extends Client {
    commands: Map<string, Command> = new Map();

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
            const handler = new Handler(this);
            
            await handler.init();
        });
    }
};
import { Client, Collection, NullablePartialEmoji } from "oceanic.js";
import getEmoji, { Emoji } from "../utils/GetEmoji";
import Handler from "./handler";
import Command from "./command";
import Component from "./component";
import Modal from "./modal";

export default class App extends Client {
    handler: Handler;
    modals: Collection<string, Modal>;
    commands: Collection<string, Command>;
    components: Collection<string, Component>;

    constructor() {
        super({
            gateway: {
                intents: [
                    "GUILDS",
                    "GUILD_MEMBERS",
                    "GUILD_MESSAGES",
                    "MESSAGE_CONTENT"
                ],
            },
            defaultImageFormat: "png",
            defaultImageSize: 4096,
            auth: process.env.TOKEN,
        });
    }

    init() {
        this.handler = new Handler(this);

        this.once("connect", async () => {
            await this.handler.init();
        });

        this.connect();
    }

    async getEmoji(name: string): Promise<Emoji | undefined> {
        const emojis = (await this.application.getEmojis()).items;
        const e = emojis.find((e) => e.name === name);
        const emoji = await getEmoji(`<${e?.animated ? "a" : ""}:${e?.name}:${e?.id}>`);

        return emoji;
    }

    async getButoji(name: string): Promise<NullablePartialEmoji | undefined> {
        const emoji = await this.getEmoji(name);

        return emoji ? {
            name: emoji?.name,
            id: emoji?.id,
        } : undefined;
    }


    async getMenoji(name: string): Promise<string | undefined> {
        const emoji = await this.getEmoji(name);

        return emoji?.mention;
    }
};
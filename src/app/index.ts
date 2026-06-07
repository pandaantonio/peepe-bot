import { Client, Collection, NullablePartialEmoji } from "oceanic.js";
import getEmoji, { Emoji } from "@/utils/GetEmoji";
import Handler from "@/struct/handler";
import Command from "@/struct/command";
import Component from "@/struct/component";
import Modal from "@/struct/modal";

export default class App extends Client {
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
            const handler = new Handler(this);
            
            await handler.init();
        });

        this.connect();
    }

    async getEmoji(name: string): Promise<Emoji | undefined> {
        const emojis = (await this.application.getEmojis()).items;
        const e = emojis.find((e) => e.name === name);
        const emoji = await getEmoji(`<${e?.animated ? "a" : ""}:${e?.name}:${e?.id}>`);

        return emoji;
    }

    async getEmrl(name: string): Promise<string | undefined> {
        const emoji = await this.getEmoji(name);

        return emoji && emoji.url ? emoji.url : undefined;
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
import { Client, Collection, CreateApplicationCommandOptions, NullablePartialEmoji } from "oceanic.js";
import getEmoji, { Emoji } from "@/utils/GetEmoji";
import Handler from "@/struct/handler";
import Command from "@/struct/command";
import Component from "@/struct/component";
import Modal from "@/struct/modal";
import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: process.env.GROQ,
});

export default class App extends Client {
    ai: Groq;
    modals: Collection<string, Modal>;
    commands: Collection<string, Command>;
    components: Collection<string, Component>;
    contexts: Map<string, CreateApplicationCommandOptions> = new Map();

    constructor() {
        super({
            gateway: {
                intents: [
                    "GUILDS",
                    "GUILD_MEMBERS",
                    "GUILD_MESSAGES",
                    "MESSAGE_CONTENT"
                ],
                autoReconnect: true,
            },
            defaultImageSize: 4096,
            auth: process.env.TOKEN,
            defaultImageFormat: "png",
        });
    }

    init() {
        this.ai = groq;
        
        this.connect().then(async () => {
            const handler = new Handler(this);
            
            await handler.init();
        });
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
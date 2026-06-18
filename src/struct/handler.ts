import App from "@/struct/app";
import { glob } from "glob";
import { resolve } from "path";
import { EVENT } from "@/struct/event";
import Command from "@/struct/command";

export default class Handler {
    protected app: App;

    constructor(app: App) {
        this.app = app;
    }

    public async init(): Promise<void> {
        await this.loadEvents();
        await this.loadCommands();
    }

    private async loadEvents(): Promise<void> {
        for (const dir of await glob("dist/events/**/*.js")) {
            const event: EVENT = (await import(resolve(dir))).default;

            this.app[event.type](event.name, async (...args) => {
                await event.run(this.app, ...args);
            });
        }
    }

    private async loadCommands(): Promise<void> {
        for (const dir of await glob("dist/commands/**/*.js")) {
            const file: Record<string, Command> = (await import(resolve(dir)));

            for (const command of Object.values(file)) {
                for (const name of command.names) {
                    this.app.commands.set(name, command);
                }
            }
        }
    }
};
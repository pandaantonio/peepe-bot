import App from "@/struct/app";
import { glob } from "glob";
import { resolve } from "path";
import { EVENT } from "@/struct/event";
import Command from "@/struct/command";
import Component from "@/struct/component";
import { Collection, CreateApplicationCommandOptions } from "oceanic.js";
import Modal from "@/struct/modal";

export default class Handler {
    protected app: App;

    constructor(app: App) {
        this.app = app;
    }

    public async init(): Promise<void> {
        await this.loadEvents();
        await this.loadModals();
        await this.loadContexts();
        await this.loadCommands();
        await this.loadComponents();
    }

    private async loadContexts(){
        for (const dir of await glob("dist/contexts/**/*.js")) {
            const context: CreateApplicationCommandOptions = (await import(resolve(dir))).default;

            this.app.contexts.set(context.name, context);
        }
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
        this.app.commands = new Collection();

        for (const dir of await glob("dist/commands/**/*.js")) {
            const file: Record<string, Command> = (await import(resolve(dir)));

            for(const command of Object.values(file)){
                if(command.names && command.names[0]){
                    for(const name of command.names){
                        this.app.commands.set(name, command);
                    }
                } else if(command.command){
                    this.app.commands.set(command.command.name, command);
                }
            }
        }
    }

    private async loadComponents(): Promise<void> {
        this.app.components = new Collection();

        for (const dir of await glob("dist/components/**/*.js")) {
            const component: Component = (await import(resolve(dir))).default;

            for (const name of component.names) {
                this.app.components.set(name, component);
            }
        }
    }

    private async loadModals(): Promise<void> {
        this.app.modals = new Collection();

        for (const dir of await glob("dist/modals/**/*.js")) {
            const modal: Modal = (await import(resolve(dir))).default;

            for (const name of modal.names) {
                this.app.modals.set(name, modal);
            }
        }
    }
};
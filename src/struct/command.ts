import { AnyInteractionChannel, ApplicationCommandOptionsSubCommand, ApplicationCommandTypes, CommandInteraction, CreateApplicationCommandOptions, Guild, Uncached, User } from "oceanic.js";
import App from "@/struct/app";

export type CommandNames = string[];

export interface CommandOptions {
    app: App;
    author: User;
    guild?: Guild;
    interaction: CommandInteraction<Uncached | AnyInteractionChannel, ApplicationCommandTypes>;
};

export type CommandRun = (options: CommandOptions) => Promise<void>;

export default class Command {
    public names: CommandNames = [];
    public run?: CommandRun;
    public command?: CreateApplicationCommandOptions;
    public subcommand?: ApplicationCommandOptionsSubCommand;

    public addName(...names: CommandNames): Command {
        for (const name of names) {
            if(!this.names.includes(name)){
                this.names.push(name);
            }
        }

        return this;
    }

    public setRun(run: CommandRun): Command {
        this.run = run;

        return this;
    }

    public setCommand(command: CreateApplicationCommandOptions): Command {
        this.command = command;
        this.addName(command.name);

        return this;
    }

    public setSubCommand(subcommand: ApplicationCommandOptionsSubCommand): Command {
        this.subcommand = subcommand;

        return this;
    }
};
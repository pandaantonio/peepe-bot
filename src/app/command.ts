import { AnyInteractionChannel, ApplicationCommandOptionsSubCommand, ApplicationCommandTypes, CommandInteraction, CreateApplicationCommandOptions, Uncached, User } from "oceanic.js";
import App from ".";

export type CommandNames = string[];

export interface CommandOptions {
    app: App;
    author: User;
    interaction: CommandInteraction<Uncached | AnyInteractionChannel, ApplicationCommandTypes>;
};

export type CommandRun = (options: CommandOptions) => Promise<void>;

export default class Command {
    public names?: CommandNames;
    public run?: CommandRun;
    public command?: CreateApplicationCommandOptions;
    public subcommand?: ApplicationCommandOptionsSubCommand;

    public addName(...names: CommandNames): Command {
        if (!this.names) this.names = [];

        this.names.push(...names);

        return this;
    }

    public setRun(run: CommandRun): Command {
        this.run = run;

        return this;
    }

    public setCommand(command: CreateApplicationCommandOptions): Command {
        this.command = command;

        return this;
    }

    public setSubCommand(subcommand: ApplicationCommandOptionsSubCommand): Command {
        this.subcommand = subcommand;

        return this;
    }
};
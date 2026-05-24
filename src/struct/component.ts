import { AnyInteractionChannel, ComponentInteraction, ComponentTypes, Guild, SelectMenuTypes, Uncached, User } from "oceanic.js";
import App from "@/app";

export type ComponentNames = string[];

export interface ComponentOptions {
    app: App;
    guild?: Guild;
    author: User;
    interaction: ComponentInteraction<ComponentTypes.BUTTON | SelectMenuTypes, Uncached | AnyInteractionChannel>;
};

export type ComponentRun = (options: ComponentOptions) => Promise<void>;

export default class Component {
    public names: ComponentNames;
    public run: ComponentRun;

    public addName(...names: ComponentNames): Component {
        if (!this.names) this.names = [];

        this.names.push(...names);

        return this;
    }

    public setRun(run: ComponentRun): Component {
        this.run = run;

        return this;
    }
};
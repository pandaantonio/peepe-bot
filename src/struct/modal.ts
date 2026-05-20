import { AnyInteractionChannel, ModalSubmitInteraction, Uncached, User } from "oceanic.js";
import App from "@/app";

export type ModalNames = string[];

export interface ModalOptions {
    app: App;
    author: User;
    interaction: ModalSubmitInteraction<Uncached | AnyInteractionChannel>;
};

export type ModalRun = (options: ModalOptions) => Promise<void>;

export default class Modal {
    public names: ModalNames;
    public run: ModalRun;

    public addName(...names: ModalNames): Modal {
        if (!this.names) this.names = [];

        this.names.push(...names);

        return this;
    }

    public setRun(run: ModalRun): Modal {
        this.run = run;

        return this;
    }
};
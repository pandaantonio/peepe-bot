import { ClientEvents } from "oceanic.js";
import App from "@/app";

export type EVENT = Event<keyof ClientEvents>;
export type EventType = "on" | "once";
export type EventRun<EventName extends keyof ClientEvents> = (app: App, ...args: ClientEvents[EventName]) => Promise<void>;

export default class Event<EventName extends keyof ClientEvents> {
    public name: EventName;
    public type: EventType;
    public run: EventRun<EventName>;

    constructor(type: EventType, name: EventName, run: EventRun<EventName>) {
        this.type = type;
        this.name = name;
        this.run = run;
    }
};
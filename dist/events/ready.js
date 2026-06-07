"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
exports.default = new event_1.default("on", "ready", async (app) => {
    console.log(`${app.user.username} is ready!`);
    for (const c of app.commands.map((c) => c)) {
        if (c.command) {
            await app.application.createGlobalCommand(c.command)
                .then((c) => console.log(`[${c.name}] created!`))
                .catch((e) => console.log(`[${c?.names?.[0]}] ${e}`));
        }
    }
    const commands2 = await app.application.getGlobalCommands();
    for (const command of commands2) {
        const isCommand = app.commands.get(command.name);
        if (!isCommand) {
            await app.application.deleteGlobalCommand(command.id)
                .catch(console.log);
        }
    }
});

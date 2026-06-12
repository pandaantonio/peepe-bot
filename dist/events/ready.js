"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
exports.default = new event_1.default("on", "ready", async (app) => {
    console.log(`${app.user.username} is ready!`);
    app.commands.forEach(async ({ command }) => {
        if (command) {
            await app.application.createGlobalCommand(command)
                .then((c) => console.log(`[${command.name}] created!`))
                .catch((e) => console.log(`[${command.name}] ${e}`));
        }
    });
    const commands = await app.application.getGlobalCommands();
    for (const c of commands) {
        const c2 = app.commands.get(c.name);
        if (!c2) {
            await app.application.deleteGlobalCommand(c.id)
                .catch(console.log);
        }
    }
});

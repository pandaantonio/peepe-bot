"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
exports.default = new event_1.default("on", "ready", async (app) => {
    console.log(`${app.user.username} is ready!`);
    app.contexts.forEach(async (c) => {
        await app.application.createGlobalCommand(c)
            .then((c) => console.log(`[${c.name}] created!`))
            .catch((e) => console.log(`[${c.name}] ${e}`));
    });
    const commands = await app.application.getGlobalCommands();
    for (const c of commands) {
        const c2 = app.contexts.get(c.name);
        if (!c2) {
            await app.application.deleteGlobalCommand(c.id)
                .catch(console.log);
        }
    }
});

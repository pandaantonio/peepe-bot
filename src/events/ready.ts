import Event from "@/struct/event";

export default new Event("on", "ready", async (app) => {
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
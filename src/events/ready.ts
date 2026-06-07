import Event from "@/struct/event";

export default new Event("on", "ready", async (app) => {
    console.log(`${app.user.username} is ready!`);

        app.commands.forEach(async ({ command }) => {
                if (command) {
                    await app.application.createGlobalCommand(command)
                        .then((c) => console.log(`[${c.name}] created!`))
                        .catch((e) => console.log(`[${command.name}] ${e}`));
                }
            });
    
            const commands = await app.application.getGlobalCommands();
    
            for (const command of commands) {
                const isCommand = app.commands.get(command.name);
    
                if (!isCommand) {
                    await app.application.deleteGlobalCommand(command.id)
                        .catch(console.log);
                }
            }
});
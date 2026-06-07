import Event from "@/struct/event";

export default new Event("on", "ready", async (app) => {
    console.log(`${app.user.username} is ready!`, app.guilds.map((g) => g.name));

    app.contexts.forEach(async (c) => {
         await app.application.createGlobalCommand(c)
                .then((c) => console.log(`[${c.name}] created!`))
                .catch((e) => console.log(`[${c.name}] ${e}`));
    });

    const commands = await app.application.getGlobalCommands();

    for(const c of commands){
        const c2 = app.contexts.get(c.name);

        if(!c2){
            await app.application.deleteGlobalCommand(c.id)
                .catch(console.log);
        }
    }
});